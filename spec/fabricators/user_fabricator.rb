Fabricator(:user) do
  transient :pword
  email do
    sequence(:email) do |i|
      ('a'..'z').to_a.shuffle[0,8].join+Faker::Name.first_name+Faker::Name.last_name+i.to_s+"@example.test"
    end
  end
  password Faker::Internet.password
  password_confirmation {|user| user[:password] }
  role            1
  display_name    ('a'..'z').to_a.shuffle[0,8].join
  url_slug    ('a'..'z').to_a.shuffle[0,8].join
end
