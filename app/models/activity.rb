class Activity < ApplicationRecord
  belongs_to :user
  belongs_to :target, polymorphic: true

  ACTIONS = %w[
    login
    create_review
    comment
    like
  ].freeze

  def action_human
    case action
    when "like"
      "liked something"
    when "comment"
      "commented"
    when "create_review"
      "created a review"
    else
      action
    end
  end

  validates :action, presence: true, inclusion: { in: ACTIONS }
end