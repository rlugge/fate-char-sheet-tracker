require 'rails_helper'

RSpec.describe SessionToken, :type => :model do
  let(:user) { OpenStruct.new(email: 'test_email@test.com') }
  describe 'encode' do
    it 'should return token' do
      expect(SessionToken.encode(user)).to be_present
    end
  end

  describe 'decode' do
    it 'should be able to decode valid token and return email' do
      token = SessionToken.encode(user)
      expect(SessionToken.decode(token)).to eq(user.email)
    end
  end
end
