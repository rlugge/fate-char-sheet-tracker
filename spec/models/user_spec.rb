require 'rails_helper'

RSpec.describe User, :type => :model do
  describe 'validations' do
    subject { Fabricate(:user) }
    it { should validate_presence_of :email }
    it { should validate_uniqueness_of :email }
    it { should validate_presence_of :display_name }
    it { should validate_length_of(:display_name).is_at_least(3) }
    it { should validate_presence_of :url_slug }
    it { should validate_length_of(:url_slug).is_at_least(3) }
    it { should validate_presence_of :role }
    it { should define_enum_for(:role).with([:user, :admin]) }

    describe 'url_slug' do
      it 'should accept letters' do
        user = Fabricate(:user)
      end
    end
  end
end
