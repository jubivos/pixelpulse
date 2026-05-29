class User < ApplicationRecord
    # Devise
    devise :database_authenticatable,
        :registerable,
        :recoverable,
        :rememberable,
        :validatable

    # Associations
    belongs_to :role

    has_many :reviews, dependent: :destroy
    has_many :news, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :likes, dependent: :destroy
    has_many :activities, dependent: :destroy

    # Validations
    validates :email, presence: true, uniqueness: true
    validates :login, presence: true, uniqueness: true
    validates :nickname, presence: true
end