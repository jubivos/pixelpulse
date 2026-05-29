class Activity < ApplicationRecord
    belongs_to :user
    belongs_to :target, polymorphic: true, optional: true

    validates :action, presence: true
end
