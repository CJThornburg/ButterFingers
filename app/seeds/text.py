from app.models import db, Text, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_texts():
    texts = [{
        "name": "demoText1",
        "userId": 1,
        "typingText": "The Revolution introduced me to art, and in turn, art introduced me to the Revolution! -Albert Einstein",
        "wordCount": 17,
        "characterCount": 103,
        "noSpaceCharacterCount": 87,
        "public": True,
        "textExp": 85,
    },
    {
        "name": "demoText2",
        "userId": 1,
        "typingText": "Let us not seek to satisfy our thirst for freedom by drinking from the cup of bitterness and hatred. -MLK",
        "wordCount": 20,
        "noSpaceCharacterCount": 86,
        "characterCount": 105,
        "public": True,
        "textExp": 100,
    },
    {
        "name": "demoText3",
        "userId": 1,
        "typingText": "The greatest purveyor of violence in the world : My own Government, I can not be Silent. -MLK",
        "wordCount": 18,
        "noSpaceCharacterCount": 76,
        "characterCount": 93,
        "public": True,
        "textExp": 90,
    },
        {
        "name": "demoText4",
        "userId": 1,
        "typingText": "The greatest purveyor of violence in the world : My own Government, I can not be Silent. -MLK",
        "wordCount": 18,
        "noSpaceCharacterCount": 76,
        "characterCount": 93,
        "public": True,
        "textExp": 90,
    },
         {
        "name": "demoText5",
        "userId": 1,
        "typingText": "You have nothing to lose but your chains, Workers of the world unite!",
        "wordCount": 13,
        "noSpaceCharacterCount": 57,
        "characterCount": 69,
        "public": True,
        "textExp": 65,
    },
    {
        "name": "demoText6",
        "userId": 1,
        "typingText": "Condemn me, It does not matter. History will absolve me.",
        "wordCount": 10,
        "noSpaceCharacterCount": 47,
        "characterCount": 56,
        "public": True,
        "textExp": 50,
    },
    {
        "name": "demoText7",
        "userId": 1,
        "typingText": "Something must be done to save humanity! A better world is possible",
        "wordCount": 12,
        "noSpaceCharacterCount": 56,
        "characterCount": 67,
        "public": True,
        "textExp": 60,
    },
    {
    "name": "demoText8",
    "userId": 2,
    "typingText": "Exploring the cosmos, we find wonder in the vastness of space and the mysteries it holds.",
    "wordCount": 14,
    "noSpaceCharacterCount": 71,
    "characterCount": 94,
    "public": True,
    "textExp": 70
    },
    {
    "name": "demoText9",
    "userId": 4,
    "typingText": "Moonlight dances on waves, creating a path of glistening silver that beckons us to explore the mysteries of the sea.",
    "wordCount": 20,
    "noSpaceCharacterCount":  107,
    "characterCount": 126,
    "public": True,
    "textExp": 100
    },
    {
    "name": "demoText6",
    "userId": 1,
    "typingText": "Sunset paints the horizon in hues of orange and gold, bidding the day farewell as stars emerge in the evening sky.",
    "wordCount": 20,
    "noSpaceCharacterCount": 100,
    "characterCount": 133,
    "public": True,
    "textExp": 100
    },
    {
    "name": "demoText7",
    "userId": 1,
    "typingText": "With each passing season, nature weaves a new tapestry of colors, reminding us of the beauty in change and transformation.",
    "wordCount": 20,
    "noSpaceCharacterCount": 108,
    "characterCount": 145,
    "public": True,
    "textExp": 100
    },
    {
    "name": "demoText8",
    "userId": 1,
    "typingText": "Mountains stand tall, touching the sky with their majestic peaks, inspiring us to reach for our own summits of achievement.",
    "wordCount": 20,
    "noSpaceCharacterCount": 108,
    "characterCount": 141,
    "public": True,
    "textExp": 100
},
    {
    "name": "demoText9",
    "userId": 1,
    "typingText": "A single candle's flame can pierce the darkest night, symbolizing hope that persists even in the face of adversity.",
    "wordCount": 20,
    "noSpaceCharacterCount": 96,
    "characterCount": 130,
    "public": True,
    "textExp": 100
},
    {
    "name": "demoText10",
    "userId": 1,
    "typingText": "Across rolling meadows, wildflowers sway in the breeze, creating a vibrant mosaic that celebrates the beauty of diversity.",
    "wordCount": 20,
    "noSpaceCharacterCount": 102,
    "characterCount": 136,
    "public": True,
    "textExp": 100
},
{
    "name": "demoText11",
    "userId": 1,
    "typingText": "With a canvas and brush, artists capture fleeting moments, freezing time and emotion in strokes of creativity and passion.",
    "wordCount": 20,
    "noSpaceCharacterCount": 103,
    "characterCount": 139,
    "public": True,
    "textExp": 100
},
{
    "name": "demoText12",
    "userId": 1,
    "typingText": "Gentle waves kiss the shore, a rhythmic dance that speaks of endless journeys and the ebb and flow of life's experiences.",
    "wordCount": 20,
    "noSpaceCharacterCount": 102,
    "characterCount": 137,
    "public": True,
    "textExp": 100
},
{
    "name": "demoText13",
    "userId": 1,
    "typingText": "In the heart of the city, skyscrapers touch the clouds, a testament to human ambition and innovation that shapes our world.",
    "wordCount": 20,
    "noSpaceCharacterCount": 104,
    "characterCount": 139,
    "public": True,
    "textExp": 100
},
{
    "name": "demoText14",
    "userId": 1,
    "typingText": "Silent snowfall blankets the landscape, turning the world into a serene wonderland, where nature's beauty reigns supreme.",
    "wordCount": 20,
    "noSpaceCharacterCount": 103,
    "characterCount": 138,
    "public": True,
    "textExp": 100
},
{
    "name": "demoText15",
    "userId": 1,
    "typingText": "Through the pages of history, heroes rise and fall, leaving behind stories of courage, sacrifice, and the pursuit of justice.",
    "wordCount": 20,
    "noSpaceCharacterCount": 103,
    "characterCount": 138,
    "public": True,
    "textExp": 100
},
{
    "name": "demoText16",
    "userId": 1,
    "typingText": "Amidst ancient ruins, whispers of civilizations past echo, reminding us of the legacy that time bestows upon the world.",
    "wordCount": 20,
    "noSpaceCharacterCount": 101,
    "characterCount": 136,
    "public": True,
    "textExp": 100
},
{
    "name": "demoText17",
    "userId": 1,
    "typingText": "Stars above form constellations, connecting distant points with myths and stories that transcend the bounds of space and time.",
    "wordCount": 20,
    "noSpaceCharacterCount": 105,
    "characterCount": 140,
    "public": True,
    "textExp": 100
},
{
        "name": "demoText18",
        "userId": 1,
        "typingText": "Beneath the twinkling stars, the universe unfolds its secrets, revealing galaxies, nebulae, and the mysteries of dark matter, inviting us to contemplate the infinite expanse.",
        "wordCount": 50,
        "noSpaceCharacterCount": 221,
        "characterCount": 276,
        "public": True,
        "textExp": 250
    },
    {
        "name": "demoText19",
        "userId": 1,
        "typingText": "In the heart of the rainforest, life thrives in every shade of green, as vibrant flora and fauna coexist in a delicate equilibrium, forming an oasis of biodiversity.",
        "wordCount": 50,
        "noSpaceCharacterCount": 213,
        "characterCount": 268,
        "public": True,
        "textExp": 250
    },
    {
        "name": "demoText20",
        "userId": 1,
        "typingText": "Amidst towering mountains, glaciers carve their paths, sculpting valleys and fjords, reminding us of the Earth's ancient history and the forces that shape its grand landscapes.",
        "wordCount": 50,
        "noSpaceCharacterCount": 216,
        "characterCount": 272,
        "public": True,
        "textExp": 250
    },
    {
        "name": "demoText21",
        "userId": 1,
        "typingText": "From the bustling city streets to tranquil countryside lanes, humanity's diverse tapestry weaves tales of cultures, traditions, and aspirations, united under the sky's universal embrace.",
        "wordCount": 50,
        "noSpaceCharacterCount": 226,
        "characterCount": 282,
        "public": True,
        "textExp": 250
    },
    {
        "name": "demoText22",
        "userId": 1,
        "typingText": "Whispers of history echo within ancient architecture, telling stories of triumphs and struggles, preserving the essence of civilizations that have shaped our modern world with their legacies.",
        "wordCount": 50,
        "noSpaceCharacterCount": 223,
        "characterCount": 277,
        "public": True,
        "textExp": 250
    },
      {
        "name": "demoText23",
        "userId": 1,
        "typingText": "Beneath the endless night sky, stars twinkle like diamonds, connecting us to the universe's ageless beauty and the wonders that lie beyond our imagination. Every constellation tells a story, a celestial narrative etched across the cosmos, guiding sailors, dreamers, and scientists alike through the vastness of space. Amidst the galaxies, planets dance in their orbits, each one a unique world, a potential cradle for life or a realm of extremes. From the scorching heat of desert planets to the frozen landscapes of icy moons, the universe's diversity is both captivating and humbling. As we gaze into the night, we reflect on our place in this grand cosmic tapestry and the mysteries that continue to beckon us forward.",
        "wordCount": 100,
        "noSpaceCharacterCount": 456,
        "characterCount": 614,
        "public": True,
        "textExp": 500
    },
    {
        "name": "demoText24",
        "userId": 1,
        "typingText": "In the heart of bustling cities, the rhythm of life pulses with the energy of a million souls, each one weaving a unique thread into the vibrant tapestry of urban existence. Skyscrapers reach for the sky, their glass and steel facades reflecting the dreams and ambitions of humanity. Amidst the noise and movement, cultures collide and blend, creating a rich mosaic of languages, cuisines, and traditions. Sidewalks become runways of diversity, where people from all walks of life share moments and stories. Yet, even in the urban frenzy, pockets of serenity can be found – a park's green oasis, a quiet cafe on a corner, a hidden garden between buildings. As the city never sleeps, it also never stops evolving, an ever-changing canvas of innovation and history.",
        "wordCount": 100,
        "noSpaceCharacterCount": 460,
        "characterCount": 617,
        "public": True,
        "textExp": 500
    },
    {
        "name": "demoText25",
        "userId": 1,
        "typingText": "Within the pages of ancient texts, the wisdom of the ages resides, passed down through generations as a beacon of insight and understanding. These tomes, weathered by time, hold the thoughts and experiences of countless minds – philosophers, scholars, poets, and visionaries. Each word is a testament to the human pursuit of knowledge and the eternal quest for truth. From dusty libraries to quiet study corners, seekers of enlightenment immerse themselves in these sacred repositories of thought, finding solace and inspiration in the company of ideas that transcend the limitations of time and space. As we turn these pages, we connect with minds long gone, bridging the gap between the past and the present, and igniting the flame of curiosity that propels us forward.",
        "wordCount": 100,
        "noSpaceCharacterCount": 452,
        "characterCount": 605,
        "public": True,
        "textExp": 500
    },
    {
        "name": "demoText26",
        "userId": 1,
        "typingText": "Among the peaks of majestic mountains, nature's artistry is on full display, with snow-capped summits touching the sky and valleys cradling lush forests and crystal-clear streams. These geological giants stand as silent witnesses to the eons, their rocky faces carved by ancient forces – wind, water, and time itself. As we ascend their slopes, we experience a profound connection to the Earth's history and the forces that have shaped its landscapes. The summit offers a vantage point of awe, a place where one can touch the sky and witness the world from a perspective reserved for the intrepid and the curious. Here, we realize the fragility and resilience of our planet, a delicate balance that we are entrusted to protect and preserve.",
        "wordCount": 100,
        "noSpaceCharacterCount": 465,
        "characterCount": 623,
        "public": True,
        "textExp": 500
    },
    {
        "name": "demoText27",
        "userId": 1,
        "typingText": "In the realm of dreams, the imagination takes flight, unfettered by the constraints of reality. In this ethereal realm, the subconscious weaves stories that defy logic and physics, creating landscapes that morph and shift with every thought. As we slumber, we navigate through surreal dimensions, meeting characters that emerge from the depths of our minds – allies, adversaries, and enigmatic guides. Time becomes a malleable concept, and the laws of nature are mere suggestions. Whether we explore the depths of the ocean or soar through starlit skies, our dreamscapes are a testament to the limitless potential of human creativity. These ephemeral journeys remind us that reality is just one facet of existence and that within the world of dreams, the impossible becomes a canvas for exploration.",
        "wordCount": 100,
        "noSpaceCharacterCount": 465,
        "characterCount": 622,
        "public": True,
        "textExp": 500
    }






    ]


    for text in texts:
         each_text = Text(**text)
         db.session.add(each_text)
         db.session.commit()

    return text


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_texts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.texts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM texts"))

    db.session.commit()
