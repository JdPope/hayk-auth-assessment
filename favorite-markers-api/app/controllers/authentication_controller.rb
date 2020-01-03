require "jwt"

class AuthenticationController < ApplicationController
  def login
    @user = User.find_by( username: params[:user][:username] )

    if !@user
      render json: { error: "Bad username or password" }, status: :unauthorized
    else
      if !@user.authenticate(params[:user][:password])
        render json: { error: "Bad username or password" }, status: :unauthorized
      else
        secret = Rails.application.secrets.secret_key_base
        @token = JWT.encode( { id: @user.id } , secret )

        render json: { token: @token }
      end
    end
  end
end
