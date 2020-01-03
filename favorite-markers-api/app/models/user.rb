class User < ApplicationRecord
  has_many :favorite_markers
  has_many :markers, through: :favorite_markers

  has_secure_password
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
end
