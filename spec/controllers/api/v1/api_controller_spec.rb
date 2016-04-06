require 'rails_helper'

RSpec.describe API::V1::APIController, type: :controller do
  controller do
    def index
      skip_authorization
      render plain: {testing: true}, content_type: 'application/json'
    end
  end

  describe 'authenticate' do
    context 'provided token' do
      let(:user) { Fabricate(:user) }
      subject(:index) { get :index }
      it 'sets current user' do
        request.headers['HTTP_AUTHORIZATION']='JWT '+SessionToken.encode(user)
        subject
        expect(assigns(:current_user)).to be_present
      end
    end
    context 'without token' do
      it 'succeeds' do
        get :index
        expect(response).to have_http_status(:success)
      end
    end
  end
end
