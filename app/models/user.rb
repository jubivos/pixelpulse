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

    before_create :generate_auth_token

    def generate_auth_token
        loop do
            self.auth_token = SecureRandom.hex(20)
            break unless User.exists?(auth_token: auth_token)
        end
    end
end