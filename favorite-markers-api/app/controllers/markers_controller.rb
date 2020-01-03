class MarkersController < ApplicationController
  before_action :authenticate, only: [:index, :favorite, :unfavorite]
  before_action :require_login, only: [:favorite, :unfavorite]

  def index
    @markers = Marker.all

    if @user
        user_favorites = @user.markers.map(&:id)
        @markers = @markers.map do |marker|
          if user_favorites.include? marker.id
            marker.is_favorite = true
          end
          marker
        end
    end

    render json: { markers: @markers }, methods: [:is_favorite]
  end

  def favorite
    FavoriteMarker.create({
      user_id: @user.id,
      marker_id: params[:marker_id]
    })

    render status: :created
  end

  def unfavorite
    @favorite_marker = FavoriteMarker.find_by(
      user_id: @user.id,
      marker_id: params[:marker_id]
    )
    if @favorite_marker
      @favorite_marker.destroy
    end

    render status: :no_content
  end

  def require_login
    if !@user
      render json: { error: "Must be logged in to save favorites" }
    end
  end
end
