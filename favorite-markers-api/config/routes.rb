Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :markers, only: [:index]
  resources :users, only: [:create]
  post "login", to: "authentication#login"
  patch "markers/:marker_id/favorite", to: "markers#favorite"
  patch "markers/:marker_id/unfavorite", to: "markers#unfavorite"
end
