class CommentsController < ApplicationController
  before_action :authenticate_user_from_token!, only: [:create, :destroy]
  before_action :set_comment, only: [:destroy]

  def index
    comments = Comment
      .where(commentable_type: "News", commentable_id: params[:news_id])
      .root
      .includes(:user, replies: :user)

    render json: ApiResponse.success(
      data: CommentSerializer.new(comments).as_json
    )
  end

  def create
    comment = Comment.new(comment_params)
    comment.user = current_user

    if comment.save
      render json: ApiResponse.success(
        data: CommentSerializer.new(comment).as_json
      ), status: :created
    else
      render json: ApiResponse.error(
        message: comment.errors.full_messages.join(", ")
      ), status: :unprocessable_entity
    end
  end

  def destroy
    unless @comment.user_id == current_user.id || current_user&.role&.name == "admin"
      return render json: ApiResponse.error(
        message: "Forbidden",
        code: "FORBIDDEN"
      ), status: :forbidden
    end

    @comment.destroy
    head :no_content
  end

  private

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(
      :content,
      :parent_id
    ).merge(
      commentable_type: "News",
      commentable_id: params[:news_id]
    )
  end
end