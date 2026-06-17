class Role < ApplicationRecord
  has_many :users

  validates :name, presence: true, uniqueness: true

  def can?(permission)
    permissions.fetch(permission.to_s, false)
  end
end