class User < ApplicationRecord
  devise :database_authenticatable,
    :registerable,
    :recoverable,
    :rememberable,
    :validatable

  belongs_to :role

  has_many :reviews, dependent: :destroy
  has_many :news, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :activities, dependent: :destroy

  has_many :notifications, dependent: :destroy
  has_many :sent_notifications,
           class_name: "Notification",
           foreign_key: "actor_id",
           dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates :login, presence: true, uniqueness: true
  validates :nickname, presence: true

  before_create :generate_auth_token

  def admin?
    role&.name == "admin"
  end

  def moderator?
    role&.name == "moderator"
  end

  def regular_user?
    role&.name == "user"
  end

  def can?(permission)
    role&.can?(permission) || false
  end

  def generate_auth_token
    loop do
      self.auth_token = SecureRandom.hex(20)
      break unless User.exists?(auth_token: auth_token)
    end
  end
end