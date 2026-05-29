class Comment < ApplicationRecord
    belongs_to :user

    belongs_to :commentable, polymorphic: true

    belongs_to :parent, class_name: "Comment", optional: true

    has_many :replies, class_name: "Comment", foreign_key: "parent_id", dependent: :destroy

    validates :content, presence: true

    validate :no_self_parent

    def no_self_parent
        errors.add(:parent_id, "cannot be self") if parent_id == id
    end
end