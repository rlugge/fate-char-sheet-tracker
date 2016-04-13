require 'rails_helper'

RSpec.describe API::V1::SessionsController, type: :controller do
  let(:valid_user_attributes) {
    {
      email: 'ronlugge@gmail.com',
      password: 'password',
      password_confirmation: 'password',
      url_slug: 'ronlugge',
      display_name: 'ronlugge'
    }
  }
  
  describe 'POST#register' do
    subject(:register) { post :register, params: { user: valid_user_attributes } }
    it 'should create a new user' do
      expect{subject}.to change{User.count}.by(1)
    end
    it 'should succeed' do
      expect(subject).to have_http_status(:success)
    end
    it 'should render 422 on error' do
      expect(post :register, params: {user:{ email: '123' }}).to \
        have_http_status :unprocessable_entity
    end
  end

  describe 'POST#create' do
    let(:user_password) { Faker::Internet.password }
    let(:user) {Fabricate(:user, password: user_password)}
    context 'success' do
      subject(:login) {post :create, params:{email:user.email, password:user_password}}
      it 'should succeed' do
        expect(subject).to have_http_status(:success)
      end
      it 'should assign jwt token' do
        subject
        expect(assigns(:jwt)).to be_present
      end
      it 'should assign user' do
        subject
        expect(assigns(:user)).to eq(user)
      end
    end
    context 'error' do
      it 'should fail on invalid email' do
        post :create, params:{email: 'some_random_email', password:user_password}
        expect(assigns(:jwt)).to be_nil
      end
      it 'should fail on invalid password' do
        post :create, params:{email: user.email, password:user_password+'abcd'}
        expect(assigns(:jwt)).to be_nil
      end
      it 'should return status code 401' do
        post :create, params:{email: user.email, password:user_password+'abcd'}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
