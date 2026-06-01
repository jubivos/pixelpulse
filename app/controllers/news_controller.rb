class NewsController < ApplicationController
    before_action :set_news, only: [:show, :update, :destroy]

    before_action :authenticate_user_from_token!,
                only: [:create, :update, :destroy]

    before_action :authorize_news_writer!,
                only: [:create, :update, :destroy]

    private

    def index
    page = params[:page].to_i <= 0 ? 1 : params[:page].to_i
    per_page = params[:per_page].to_i <= 0 ? 10 : params[:per_page].to_i

    base = News.sorted(params[:sort])

    total = base.count

    news = base
        .includes(:user, :news_images, :likes)
        .offset((page - 1) * per_page)
        .limit(per_page)

    render json: {
        data: NewsSerializer.new(news).as_json,
        meta: {
        page: page,
        per_page: per_page,
        total: total,
        total_pages: (total.to_f / per_page).ceil
        }
    }
    end
    def show
        news = News
            .includes(:user, :news_images, comments: [:user, :replies])
            .find(params[:id])

        root_comments = news.comments.where(parent_id: nil)

        render json: {
            id: news.id,
            title: news.title,
            content: news.content,
            published_at: news.published_at,

            author: {
            id: news.user.id,
            nickname: news.user.nickname
            },

            images: news.news_images
            .sort_by(&:position)
            .map { |img| img.image_url },

            likes_count: news.likes.count,

            comments: build_comment_tree(root_comments)
        }
    end
    def create
        news = current_user.news.build(news_params)

        if news.save
            render json: news, status: :created
        else
            render json: news.errors, status: :unprocessable_entity
        end
    end
    def update
        if @news.update(news_params)
            render json: @news
        else
            render json: @news.errors,
                status: :unprocessable_entity
        end
    end
    def destroy
        @news.destroy

        head :no_content
    end
    def news_params
        params.require(:news).permit(
            :title,
            :content,
            :published_at
        )
    end
    def authorize_news_writer!
        allowed_roles = %w[
            admin
            moderator
            news_writer
        ]

        unless allowed_roles.include?(current_user.role.name)
            render json: {
            error: "Forbidden"
            }, status: :forbidden
        end
    end
    def authorize_news_creation!
        unless current_user.role.can?(:create_news)
            render json: { error: "Forbidden" }, status: :forbidden
        end
    end
    
end