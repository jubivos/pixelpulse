class NewsController < ApplicationController
  before_action :set_news, only: [:show, :update, :destroy]

  skip_before_action :authenticate_user_from_token!, only: [:index, :show]

  before_action :authenticate_user_from_token!,
                only: [:create, :update, :destroy]

  before_action :authorize_news_writer!,
                only: [:create, :update, :destroy]


  def index
    page = params[:page].to_i <= 0 ? 1 : params[:page].to_i
    per_page = params[:per_page].to_i <= 0 ? 10 : params[:per_page].to_i

    base = News.sorted(params[:sort])

    total = base.count

    news = base
      .includes(:user, :news_images, :likes)
      .offset((page - 1) * per_page)
      .limit(per_page)

    render json: ApiResponse.success(
      data: NewsSerializer.new(news).as_json,
      meta: {
        page: page,
        per_page: per_page,
        total: total,
        total_pages: (total.to_f / per_page).ceil
      }
    )
  end

  def show
    comments = @news.comments.root.includes(:user, replies: :user)

    render json: ApiResponse.success(
      data: {
        id: @news.id,
        title: @news.title,
        content: @news.content,
        published_at: @news.published_at,

        cover_image_url: @news.news_images.find(&:is_cover)&.image_url,

        author: {
          id: @news.user.id,
          nickname: @news.user.nickname
        },

        likes_count: @news.likes.size,
        comments_count: @news.comments.size,

        comments: CommentSerializer.new(comments).as_json
      }
    )
  end


  def create
    news = current_user.news.build(news_params)

    if news.save
      render json: ApiResponse.success(data: news), status: :created
    else
      render json: ApiResponse.error(
        message: news.errors.full_messages.join(", ")
      ), status: :unprocessable_entity
    end
  end

  def update
    if @news.update(news_params)
      render json: ApiResponse.success(data: @news)
    else
      render json: ApiResponse.error(
        message: @news.errors.full_messages.join(", ")
      ), status: :unprocessable_entity
    end
  end

  def destroy
    @news.destroy
    head :no_content
  end


  private

  def set_news
    @news = News
      .includes(:user, :news_images, :likes, comments: [:user, replies: :user])
      .find(params[:id])
  end

  def news_params
    params.require(:news).permit(
      :title,
      :content,
      :published_at
    )
  end

  def authorize_news_writer!
    allowed_roles = %w[admin moderator news_writer]

    unless allowed_roles.include?(current_user.role.name)
      render json: ApiResponse.error(
        message: "Forbidden",
        code: "FORBIDDEN"
      ), status: :forbidden
    end
  end
end