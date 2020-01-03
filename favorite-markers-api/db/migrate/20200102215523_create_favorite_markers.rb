class CreateFavoriteMarkers < ActiveRecord::Migration[5.2]
  def change
    create_table :favorite_markers do |t|
      t.references :user, foreign_key: true
      t.references :marker, foreign_key: true
      t.timestamps
    end
  end
end
