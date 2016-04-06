Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :sessions, only: [:create] do
        post :register, on: :collection
      end
    end
  end
end
