class Marker < ApplicationRecord
  attr_accessor :is_favorite

  has_many :favorite_markers
  has_many :users, through: :favorite_markers
end
