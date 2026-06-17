admin = Role.find_or_create_by!(name: "admin")
admin.update!(
  permissions: {
    view_admin_panel: true,
    manage_users: true,
    view_users: true,
    delete_users: true,
    manage_news: true,
    create_news: true,
    edit_news: true,
    delete_news: true,
    moderate_news: true,
    manage_games: true,
    create_games: true,
    edit_games: true,
    delete_games: true,
    moderate_reviews: true,
    delete_reviews: true,
    moderate_comments: true,
    delete_comments: true,
    create_review: true,
    comment: true,
    like: true
  }
)

moderator = Role.find_or_create_by!(name: "moderator")
moderator.update!(
  permissions: {
    view_admin_panel: false,
    moderate_news: true,
    moderate_reviews: true,
    moderate_comments: true,
    create_review: true,
    comment: true,
    like: true
  }
)

user_role = Role.find_or_create_by!(name: "user")
user_role.update!(
  permissions: {
    create_review: true,
    comment: true,
    like: true
  }
)

users_data = [
  ["admin@test.com", "admin1", "Admin", admin],
  ["moderator@test.com", "moderator1", "Moderator", moderator],
  ["pixel@test.com", "pixelhero", "PixelHero", user_role],
  ["arcade@test.com", "arcadefox", "ArcadeFox", user_role],
  ["retro@test.com", "retromage", "RetroMage", user_role],
  ["quest@test.com", "questwolf", "QuestWolf", user_role],
  ["neon@test.com", "neonblade", "NeonBlade", user_role]
]

users_data.each do |email, login, nickname, role|
  user = User.find_or_initialize_by(email: email)
  user.assign_attributes(
    login: login,
    nickname: nickname,
    password: "password",
    role: role
  )
  user.save!
end

players = User.where(role: user_role)
admin_user = User.find_by!(login: "admin1")

genres = %w[Action RPG Adventure Strategy Racing Horror Indie Platformer Fighting].map do |name|
  Genre.find_or_create_by!(name: name)
end

tags = [
  "Open World",
  "Multiplayer",
  "Pixel Art",
  "Story Rich",
  "Cyberpunk",
  "Fantasy",
  "Soulslike",
  "Co-op",
  "Retro",
  "Atmospheric",
  "Tactical",
  "Fast-Paced"
].map do |name|
  Tag.find_or_create_by!(name: name)
end

games_data = [
  {
    title: "Elden Ring",
    description: "Мрачное фэнтези-приключение в огромном открытом мире, где каждый замок, болото и подземелье скрывают опасность, тайны и сильных противников.",
    specifications: "Жанр: Action RPG. Особенности: открытый мир, боссы, прокачка персонажа, исследование, высокая сложность.",
    cover_image_url: "https://picsum.photos/seed/elden-ring/600/400",
    release_date: "2022-02-25",
    genres: ["RPG", "Action"],
    tags: ["Open World", "Soulslike", "Fantasy"]
  },
  {
    title: "Cyberpunk 2077",
    description: "Неоновый ролевой экшен о наёмнике в городе будущего, где импланты, корпорации и уличные банды решают судьбы людей.",
    specifications: "Жанр: RPG. Особенности: сюжетные выборы, открытый город, киберимпланты, прокачка, транспорт.",
    cover_image_url: "https://picsum.photos/seed/cyberpunk-2077/600/400",
    release_date: "2020-12-10",
    genres: ["RPG", "Action"],
    tags: ["Cyberpunk", "Open World", "Story Rich"]
  },
  {
    title: "Hades",
    description: "Динамичный рогалик о побеге из подземного царства, где каждая смерть открывает новые диалоги, способности и возможности.",
    specifications: "Жанр: Action Roguelike. Особенности: быстрые бои, мифология, повторные забеги, сюжет через прогресс.",
    cover_image_url: "https://picsum.photos/seed/hades-game/600/400",
    release_date: "2020-09-17",
    genres: ["Action", "Indie"],
    tags: ["Fast-Paced", "Story Rich", "Atmospheric"]
  },
  {
    title: "Baldur's Gate 3",
    description: "Глубокая партийная RPG с большим количеством выборов, живыми персонажами и тактическими сражениями.",
    specifications: "Жанр: RPG. Особенности: пошаговые бои, диалоги, кооператив, нелинейные квесты.",
    cover_image_url: "https://picsum.photos/seed/baldurs-gate-3/600/400",
    release_date: "2023-08-03",
    genres: ["RPG", "Strategy"],
    tags: ["Tactical", "Story Rich", "Co-op"]
  },
  {
    title: "Hollow Knight",
    description: "Атмосферная метроидвания о маленьком рыцаре, исследующем заброшенное королевство насекомых.",
    specifications: "Жанр: Metroidvania. Особенности: исследование, боссы, платформинг, мрачная атмосфера.",
    cover_image_url: "https://picsum.photos/seed/hollow-knight/600/400",
    release_date: "2017-02-24",
    genres: ["Adventure", "Platformer", "Indie"],
    tags: ["Atmospheric", "Soulslike", "Pixel Art"]
  },
  {
    title: "Disco Elysium",
    description: "Детективная RPG без традиционных боёв, где главный конфликт происходит в диалогах, мыслях и решениях героя.",
    specifications: "Жанр: RPG. Особенности: расследование, диалоги, навыки личности, сильный сюжет.",
    cover_image_url: "https://picsum.photos/seed/disco-elysium/600/400",
    release_date: "2019-10-15",
    genres: ["RPG", "Adventure"],
    tags: ["Story Rich", "Atmospheric"]
  },
  {
    title: "Stardew Valley",
    description: "Уютная игра о ферме, дружбе, ремесле и жизни в маленьком городке, где каждый день можно провести по-своему.",
    specifications: "Жанр: Simulation. Особенности: ферма, рыбалка, отношения, крафт, исследование шахт.",
    cover_image_url: "https://picsum.photos/seed/stardew-valley/600/400",
    release_date: "2016-02-26",
    genres: ["Indie", "Adventure"],
    tags: ["Co-op", "Pixel Art", "Atmospheric"]
  },
  {
    title: "Resident Evil 4 Remake",
    description: "Напряжённый survival horror с обновлённой постановкой, перестрелками и тревожной атмосферой изолированной деревни.",
    specifications: "Жанр: Horror Action. Особенности: выживание, ресурсы, перестрелки, боссы, кинематографичная подача.",
    cover_image_url: "https://picsum.photos/seed/resident-evil-4/600/400",
    release_date: "2023-03-24",
    genres: ["Horror", "Action"],
    tags: ["Atmospheric", "Story Rich", "Fast-Paced"]
  },
  {
    title: "Forza Horizon 5",
    description: "Яркая гоночная песочница с огромной картой, сотнями автомобилей и фестивальной атмосферой.",
    specifications: "Жанр: Racing. Особенности: открытый мир, автомобили, соревнования, онлайн-заезды.",
    cover_image_url: "https://picsum.photos/seed/forza-horizon-5/600/400",
    release_date: "2021-11-09",
    genres: ["Racing"],
    tags: ["Open World", "Multiplayer", "Fast-Paced"]
  },
  {
    title: "Celeste",
    description: "Точный пиксельный платформер о восхождении на гору и борьбе с собственными страхами.",
    specifications: "Жанр: Platformer. Особенности: сложные уровни, пиксельная графика, эмоциональный сюжет.",
    cover_image_url: "https://picsum.photos/seed/celeste-game/600/400",
    release_date: "2018-01-25",
    genres: ["Platformer", "Indie"],
    tags: ["Pixel Art", "Story Rich", "Retro"]
  },
  {
    title: "Mortal Kombat 1",
    description: "Зрелищный файтинг с перезапущенной вселенной, брутальными боями и узнаваемыми персонажами.",
    specifications: "Жанр: Fighting. Особенности: комбо, арены, сюжетная кампания, локальный и онлайн-мультиплеер.",
    cover_image_url: "https://picsum.photos/seed/mortal-kombat-1/600/400",
    release_date: "2023-09-19",
    genres: ["Fighting", "Action"],
    tags: ["Multiplayer", "Fast-Paced"]
  },
  {
    title: "The Witcher 3",
    description: "Большое фэнтези-приключение о ведьмаке Геральте, полном моральных выборов, чудовищ и сильных историй.",
    specifications: "Жанр: RPG. Особенности: открытый мир, квесты, алхимия, монстры, сильный сюжет.",
    cover_image_url: "https://picsum.photos/seed/witcher-3/600/400",
    release_date: "2015-05-19",
    genres: ["RPG", "Adventure"],
    tags: ["Open World", "Fantasy", "Story Rich"]
  }
]

games_data.each do |data|
  game = Game.find_or_initialize_by(title: data[:title])
  game.update!(
    description: data[:description],
    specifications: data[:specifications],
    cover_image_url: data[:cover_image_url],
    release_date: data[:release_date]
  )

  game.genres = data[:genres].map { |name| Genre.find_or_create_by!(name: name) }
  game.tags = data[:tags].map { |name| Tag.find_or_create_by!(name: name) }
end

review_texts = [
  "Очень сильная игра, которая цепляет атмосферой и заставляет возвращаться снова.",
  "Мне понравилась структура прогресса и то, как игра награждает за исследование.",
  "Есть спорные моменты, но общее впечатление получилось очень хорошим.",
  "Визуально и музыкально игра отлично держит стиль, особенно для вечерних сессий.",
  "Геймплей местами сложный, но именно это делает победы особенно приятными."
]

Game.all.each_with_index do |game, index|
  players.sample(3).each_with_index do |player, i|
    Review.find_or_create_by!(game: game, user: player) do |review|
      review.rating = [7, 8, 9, 10, 6].sample
      review.content = "#{review_texts[(index + i) % review_texts.length]} #{game.title} точно стоит попробовать."
      review.status = "published"
    end
  end
end

news_data = [
  {
    title: "Новая волна ретро-игр возвращает пиксельную эстетику",
    content: "Инди-разработчики всё чаще обращаются к визуальному стилю 90-х: крупные пиксели, ограниченные палитры и чиптюн снова становятся частью современной игровой культуры.",
    cover_image_url: "https://picsum.photos/seed/retro-news/800/400"
  },
  {
    title: "Игроки выбирают атмосферу важнее графики",
    content: "Свежие обсуждения показывают, что для многих игроков важнее запоминающийся мир, музыка и история, чем фотореалистичная графика.",
    cover_image_url: "https://picsum.photos/seed/atmosphere-news/800/400"
  },
  {
    title: "Кооперативные игры снова набирают популярность",
    content: "После роста одиночных сюжетных проектов игроки снова активно возвращаются к кооперативным прохождениям, локальным вечеринкам и совместным испытаниям.",
    cover_image_url: "https://picsum.photos/seed/coop-news/800/400"
  },
  {
    title: "Сложные игры стали новым способом расслабиться",
    content: "Парадоксально, но многие игроки используют сложные проекты как способ отвлечься: концентрация на боссе или уровне помогает забыть о повседневной рутине.",
    cover_image_url: "https://picsum.photos/seed/hard-games-news/800/400"
  },
  {
    title: "Пользовательские рецензии влияют на популярность игр",
    content: "Игровые сообщества всё чаще доверяют не рекламным трейлерам, а подробным отзывам других игроков, особенно если в них есть честные плюсы и минусы.",
    cover_image_url: "https://picsum.photos/seed/reviews-news/800/400"
  }
]

news_data.each_with_index do |data, i|
  news = News.find_or_initialize_by(title: data[:title])
  news.update!(
    content: data[:content],
    published_at: Time.current - i.hours,
    user: admin_user
  )

  NewsImage.find_or_create_by!(news: news, is_cover: true) do |image|
    image.image_url = data[:cover_image_url]
    image.position = 1
  end
end

News.all.each do |news|
  players.sample(3).each do |player|
    Comment.find_or_create_by!(
      user: player,
      commentable: news,
      content: [
        "Интересная новость, хочется узнать больше подробностей.",
        "Согласен, эта тема сейчас действительно активно обсуждается.",
        "Классно, что такие материалы появляются на сайте.",
        "Мне нравится направление, в котором развивается игровая индустрия."
      ].sample
    )
  end
end

puts "Seed completed!"
puts "Users: #{User.count}"
puts "Games: #{Game.count}"
puts "Reviews: #{Review.count}"
puts "News: #{News.count}"
puts "Comments: #{Comment.count}"