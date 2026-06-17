class ProfilesController < ApplicationController
  def show
    user = current_user

    latest_reviews = user.reviews
      .includes(:game)
      .order(created_at: :desc)
      .limit(5)

    latest_comments = user.comments
      .includes(:commentable)
      .order(created_at: :desc)
      .limit(5)

    favorite_games = user.reviews
      .includes(:game)
      .where("rating >= ?", 8)
      .order(rating: :desc)
      .limit(5)

    render json: ApiResponse.success(
      data: {
        user: {
          id: user.id,
          login: user.login,
          nickname: user.nickname,
          email: user.email,
          role: user.role.name,
          registered_at: user.registered_at,
          last_activity_at: user.last_activity_at
        },

        stats: {
          reviews_count: user.reviews.count,
          comments_count: user.comments.count,
          likes_given_count: user.likes.count,
          news_count: user.news.count,
          activities_count: user.activities.count
        },

        favorite_games: favorite_games.map { |review|
          {
            id: review.game.id,
            title: review.game.title,
            rating: review.rating,
            url: "/games/#{review.game.id}"
          }
        },

        latest_reviews: latest_reviews.map { |review|
          {
            id: review.id,
            game_id: review.game.id,
            game_title: review.game.title,
            rating: review.rating,
            content: review.content,
            status: review.status,
            created_at: review.created_at,
            url: "/games/#{review.game.id}"
          }
        },

        latest_comments: latest_comments.map { |comment|
          {
            id: comment.id,
            content: comment.content,
            commentable_type: comment.commentable_type,
            commentable_id: comment.commentable_id,
            commentable_title: commentable_title(comment),
            created_at: comment.created_at,
            url: commentable_url(comment)
          }
        }
      }
    )
  end

  private

  def commentable_title(comment)
    case comment.commentable
    when News
      comment.commentable.title
    when Review
      comment.commentable.game.title
    else
      "Материал ##{comment.commentable_id}"
    end
  end

  def commentable_url(comment)
    case comment.commentable
    when News
      "/news/#{comment.commentable.id}"
    when Review
      "/games/#{comment.commentable.game_id}"
    else
      "#"
    end
  end
end