class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :email, null:false, index: true, unique: true
      t.boolean :email_verified, default: false
      t.string :password_digest
      t.integer :role, null:false, default: 0
      t.string :display_name, null:false, index: true
      t.string :url_slug, null:false, index: true

      t.timestamps
    end
  end
end
