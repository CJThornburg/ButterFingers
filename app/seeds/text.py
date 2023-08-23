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
    "userId": 2,
    "typingText": "Mountains stand tall, touching the sky with their majestic peaks, inspiring us to reach for our own summits of achievement.",
    "wordCount": 20,
    "noSpaceCharacterCount": 108,
    "characterCount": 141,
    "public": True,
    "textExp": 100
},
    {
    "name": "demoText9",
    "userId": 4,
    "typingText": "A single candle's flame can pierce the darkest night, symbolizing hope that persists even in the face of adversity.",
    "wordCount": 20,
    "noSpaceCharacterCount": 96,
    "characterCount": 130,
    "public": True,
    "textExp": 100
},
    {
    "name": "demoText10",
    "userId": 5,
    "typingText": "Across rolling meadows, wildflowers sway in the breeze, creating a vibrant mosaic that celebrates the beauty of diversity.",
    "wordCount": 20,
    "noSpaceCharacterCount": 102,
    "characterCount": 136,
    "public": True,
    "textExp": 100
},
{
    "name": "demoText11",
    "userId": 6,
    "typingText": "With a canvas and brush, artists capture fleeting moments, freezing time and emotion in strokes of creativity and passion.",
    "wordCount": 20,
    "noSpaceCharacterCount": 103,
    "characterCount": 139,
    "public": True,
    "textExp": 100
},
{
    "name": "demoText12",
    "userId": 7,
    "typingText": "Gentle waves kiss the shore, a rhythmic dance that speaks of endless journeys and the ebb and flow of life's experiences.",
    "wordCount": 20,
    "noSpaceCharacterCount": 102,
    "characterCount": 137,
    "public": True,
    "textExp": 100
},
{
    "name": "demoText13",
    "userId": 8,
    "typingText": "In the heart of the city, skyscrapers touch the clouds, a testament to human ambition and innovation that shapes our world.",
    "wordCount": 20,
    "noSpaceCharacterCount": 104,
    "characterCount": 139,
    "public": True,
    "textExp": 100
},
{
    "name": "demoText14",
    "userId": 9,
    "typingText": "Silent snowfall blankets the landscape, turning the world into a serene wonderland, where nature's beauty reigns supreme.",
    "wordCount": 20,
    "noSpaceCharacterCount": 103,
    "characterCount": 138,
    "public": True,
    "textExp": 100
},
{
    "name": "demoText15",
    "userId": 10,
    "typingText": "Through the pages of history, heroes rise and fall, leaving behind stories of courage, sacrifice, and the pursuit of justice.",
    "wordCount": 20,
    "noSpaceCharacterCount": 103,
    "characterCount": 138,
    "public": True,
    "textExp": 100
},
{
    "name": "demoText16",
    "userId": 2,
    "typingText": "Amidst ancient ruins, whispers of civilizations past echo, reminding us of the legacy that time bestows upon the world.",
    "wordCount": 20,
    "noSpaceCharacterCount": 101,
    "characterCount": 136,
    "public": True,
    "textExp": 100
},
{
    "name": "demoText17",
    "userId": 3,
    "typingText": "Stars above form constellations, connecting distant points with myths and stories that transcend the bounds of space and time.",
    "wordCount": 20,
    "noSpaceCharacterCount": 105,
    "characterCount": 140,
    "public": True,
    "textExp": 100
},
{
        "name": "demoText18",
        "userId": 4,
        "typingText": "Beneath the twinkling stars, the universe unfolds its secrets, revealing galaxies, nebulae, and the mysteries of dark matter, inviting us to contemplate the infinite expanse.",
        "wordCount": 50,
        "noSpaceCharacterCount": 221,
        "characterCount": 276,
        "public": True,
        "textExp": 250
    },
    {
        "name": "demoText19",
        "userId": 5,
        "typingText": "In the heart of the rainforest, life thrives in every shade of green, as vibrant flora and fauna coexist in a delicate equilibrium, forming an oasis of biodiversity.",
        "wordCount": 50,
        "noSpaceCharacterCount": 213,
        "characterCount": 268,
        "public": True,
        "textExp": 250
    },
    {
        "name": "demoText20",
        "userId": 6,
        "typingText": "Amidst towering mountains, glaciers carve their paths, sculpting valleys and fjords, reminding us of the Earth's ancient history and the forces that shape its grand landscapes.",
        "wordCount": 50,
        "noSpaceCharacterCount": 216,
        "characterCount": 272,
        "public": True,
        "textExp": 250
    },
    {
        "name": "demoText21",
        "userId": 7,
        "typingText": "From the bustling city streets to tranquil countryside lanes, humanity's diverse tapestry weaves tales of cultures, traditions, and aspirations, united under the sky's universal embrace.",
        "wordCount": 50,
        "noSpaceCharacterCount": 226,
        "characterCount": 282,
        "public": True,
        "textExp": 250
    },
    {
        "name": "demoText22",
        "userId": 8,
        "typingText": "Whispers of history echo within ancient architecture, telling stories of triumphs and struggles, preserving the essence of civilizations that have shaped our modern world with their legacies.",
        "wordCount": 50,
        "noSpaceCharacterCount": 223,
        "characterCount": 277,
        "public": True,
        "textExp": 250
    },
      {
        "name": "demoText23",
        "userId": 9,
        "typingText": "Beneath the endless night sky, stars twinkle like diamonds, connecting us to the universe's ageless beauty and the wonders that lie beyond our imagination. Every constellation tells a story, a celestial narrative etched across the cosmos, guiding sailors, dreamers, and scientists alike through the vastness of space. Amidst the galaxies, planets dance in their orbits, each one a unique world, a potential cradle for life or a realm of extremes. From the scorching heat of desert planets to the frozen landscapes of icy moons, the universe's diversity is both captivating and humbling. As we gaze into the night, we reflect on our place in this grand cosmic tapestry and the mysteries that continue to beckon us forward.",
        "wordCount": 100,
        "noSpaceCharacterCount": 456,
        "characterCount": 614,
        "public": True,
        "textExp": 500
    },
    {
        "name": "demoText24",
        "userId": 10,
        "typingText": "In the heart of bustling cities, the rhythm of life pulses with the energy of a million souls, each one weaving a unique thread into the vibrant tapestry of urban existence. Skyscrapers reach for the sky, their glass and steel facades reflecting the dreams and ambitions of humanity. Amidst the noise and movement, cultures collide and blend, creating a rich mosaic of languages, cuisines, and traditions. Sidewalks become runways of diversity, where people from all walks of life share moments and stories. Yet, even in the urban frenzy, pockets of serenity can be found – a park's green oasis, a quiet cafe on a corner, a hidden garden between buildings. As the city never sleeps, it also never stops evolving, an ever-changing canvas of innovation and history.",
        "wordCount": 100,
        "noSpaceCharacterCount": 460,
        "characterCount": 617,
        "public": True,
        "textExp": 500
    },
    {
        "name": "demoText25",
        "userId": 11,
        "typingText": "Within the pages of ancient texts, the wisdom of the ages resides, passed down through generations as a beacon of insight and understanding. These tomes, weathered by time, hold the thoughts and experiences of countless minds – philosophers, scholars, poets, and visionaries. Each word is a testament to the human pursuit of knowledge and the eternal quest for truth. From dusty libraries to quiet study corners, seekers of enlightenment immerse themselves in these sacred repositories of thought, finding solace and inspiration in the company of ideas that transcend the limitations of time and space. As we turn these pages, we connect with minds long gone, bridging the gap between the past and the present, and igniting the flame of curiosity that propels us forward.",
        "wordCount": 100,
        "noSpaceCharacterCount": 452,
        "characterCount": 605,
        "public": True,
        "textExp": 500
    },
    {
        "name": "demoText26",
        "userId": 2,
        "typingText": "Among the peaks of majestic mountains, nature's artistry is on full display, with snow-capped summits touching the sky and valleys cradling lush forests and crystal-clear streams. These geological giants stand as silent witnesses to the eons, their rocky faces carved by ancient forces – wind, water, and time itself. As we ascend their slopes, we experience a profound connection to the Earth's history and the forces that have shaped its landscapes. The summit offers a vantage point of awe, a place where one can touch the sky and witness the world from a perspective reserved for the intrepid and the curious. Here, we realize the fragility and resilience of our planet, a delicate balance that we are entrusted to protect and preserve.",
        "wordCount": 100,
        "noSpaceCharacterCount": 465,
        "characterCount": 623,
        "public": True,
        "textExp": 500
    },
    {
        "name": "demoText27",
        "userId": 3,
        "typingText": "In the realm of dreams, the imagination takes flight, unfettered by the constraints of reality. In this ethereal realm, the subconscious weaves stories that defy logic and physics, creating landscapes that morph and shift with every thought. As we slumber, we navigate through surreal dimensions, meeting characters that emerge from the depths of our minds – allies, adversaries, and enigmatic guides. Time becomes a malleable concept, and the laws of nature are mere suggestions. Whether we explore the depths of the ocean or soar through starlit skies, our dreamscapes are a testament to the limitless potential of human creativity. These ephemeral journeys remind us that reality is just one facet of existence and that within the world of dreams, the impossible becomes a canvas for exploration.",
        "wordCount": 100,
        "noSpaceCharacterCount": 465,
        "characterCount": 622,
        "public": True,
        "textExp": 500
    },
    {
    "name": "random20.1",
    "userId": 1,
    "typingText": "acquisition wilderness appreciate interference hurt unlawful buy front established litigation mine guarantee depend fence prospect chase concentrate update merchant spot.",
    "wordCount": 20,
    "noSpaceCharacterCount": 102,
    "characterCount": 137,
    "public": True,
    "textExp": 100
},
       {
    "name": "random20.2",
    "userId": 2,
    "typingText": "apathy shatter minister lobby behavior cane qualify patience proper magnitude hot coincidence perfume hover series criticism code speaker log despise",
    "wordCount": 20,
    "noSpaceCharacterCount": 102,
    "characterCount": 137,
    "public": True,
    "textExp": 100
},
            {
    "name": "random20.3",
    "userId": 3,
    "typingText": "eavesdrop foot grandfather separate pan writer benefit senior slant coalition honest lazy breed sensitive conceive pneumonia pony eye proud wall",
    "wordCount": 20,
    "noSpaceCharacterCount": 102,
    "characterCount": 137,
    "public": True,
    "textExp": 100
},
            {
    "name": "random20.4",
    "userId": 4,
    "typingText": "ballot behead monk navy virtue manual consciousness mystery memorandum witness joystick inn minimum fog white community birthday humor appear freedom",
    "wordCount": 20,
    "noSpaceCharacterCount": 102,
    "characterCount": 137,
    "public": True,
    "textExp": 100
},
                        {
    "name": "random20.5",
    "userId": 5,
    "typingText": "flag regard precision essential exceed wild us fate translate jet difference rocket salesperson choke quest original margin belief refrigerator whole",
    "wordCount": 20,
    "noSpaceCharacterCount": 102,
    "characterCount": 137,
    "public": True,
    "textExp": 100
},
{
  "name": "random20.6",
  "userId": 1,
  "typingText": "spiritual salad velvet prefer wheel edition rely damp slender refresh hip establish sip wrestle blade arrow assault mock start now",
  "wordCount": 20,
  "noSpaceCharacterCount": 111,
  "characterCount": 130,
  "public": True,
  "textExp": 100
},
{
  "name": "random20.7",
  "userId": 2,
  "typingText": "directive sample repair series abstract unfair machine unknown absorb uncle border sustain fabricate plan climb exotic blue grain tribe now",
  "wordCount": 20,
  "noSpaceCharacterCount": 120,
  "characterCount": 139,
  "public": True,
  "textExp": 100
},
{
  "name": "random20.8",
  "userId": 3,
  "typingText": "helmet angle curious grape taste pledge snack rough rebel irony symptom real thank transfer embrace create biology flight cart now",
  "wordCount": 20,
  "noSpaceCharacterCount": 111,
  "characterCount": 130,
  "public": True,
  "textExp": 100
},
{
  "name": "random20.9",
  "userId": 4,
  "typingText": "suffer cabin part growth frost diet spoon comfort menu truth silver abstract donor stable seat ghost brief sight antler revolution",
  "wordCount": 20,
  "noSpaceCharacterCount": 111,
  "characterCount": 130,
  "public": True,
  "textExp": 100
},
{
  "name": "random20.10",
  "userId": 5,
  "typingText": "moral frost cannon adjust grab bamboo flower tobacco crumble model dilemma install educate goat burden vapor glide scale cluster home",
  "wordCount": 20,
  "noSpaceCharacterCount": 114,
  "characterCount": 133,
  "public": True,
  "textExp": 100
},

  {
    "name": "random20.11",
    "userId": 6,
    "typingText": "pause banner merit surface ice cave duck slide fashion fiber immune exhibit arch rally deal dune reunion sauce leisure apple",
    "wordCount": 20,
    "noSpaceCharacterCount": 100,
    "characterCount": 131,
    "public": True,
    "textExp": 100
  },
  {
    "name": "random20.12",
    "userId": 7,
    "typingText": "entry spice sing flavor elevator hawk smile survey jewel cousin update defense absorb practice proof sketch width snap rocket coffee",
    "wordCount": 20,
    "noSpaceCharacterCount": 105,
    "characterCount": 124,
    "public": True,
    "textExp": 100
  },
  {
    "name": "random20.13",
    "userId": 8,
    "typingText": "general refuse beauty tenant method impulse guitar frown blouse animal strike slice flame ostrich water milk property trophy angry banana",
    "wordCount": 20,
    "noSpaceCharacterCount": 118,
    "characterCount": 137,
    "public": True,
    "textExp": 100
  },
  {
    "name": "random20.14",
    "userId": 9,
    "typingText": "barely unaware negative glory case advice lamp term crew orchard orbit tunnel skin hover spy prevent devote custom midnight piano",
    "wordCount": 20,
    "noSpaceCharacterCount": 110,
    "characterCount": 129,
    "public": True,
    "textExp": 100
  },
  {
    "name": "random20.15",
    "userId": 10,
    "typingText": "coil cricket trust vital margin shed soldier car blade under proof stable shallow skate acid crumble view toast prison guitar",
    "wordCount": 20,
    "noSpaceCharacterCount": 106,
    "characterCount": 125,
    "public": True,
    "textExp": 100
  },
  {
    "name": "random21.6",
    "userId": 11,
    "typingText": "melt lend image nephew dinosaur craft stage escape lemon garlic purchase royal gallery list seat castle manage rapid doll castle",
    "wordCount": 20,
    "noSpaceCharacterCount": 109,
    "characterCount": 128,
    "public": True,
    "textExp": 100
  },
  {
    "name": "random21.7",
    "userId": 12,
    "typingText": "tragic lend response relax borrow mandate unit kite gate topic artwork extend tower flat vendor lizard pond release century knight",
    "wordCount": 20,
    "noSpaceCharacterCount": 111,
    "characterCount": 130,
    "public": True,
    "textExp": 100
  },
  {
    "name": "random21.8",
    "userId": 13,
    "typingText": "garage crush ecology crucial tell blouse culture tackle dwarf plate lift town witness rude leisure oxygen timber hospital skin fight",
    "wordCount": 20,
    "noSpaceCharacterCount": 113,
    "characterCount": 132,
    "public": True,
    "textExp": 100
  },
  {
    "name": "random21.9",
    "userId": 14,
    "typingText": "passion night ocean blue glow suffer bottom fame priority output bronze peace slush choice shoe bomb village refuse switch dwight",
    "wordCount": 20,
    "noSpaceCharacterCount": 110,
    "characterCount": 129,
    "public": True,
    "textExp": 100
  },
  {
    "name": "random21.10",
    "userId": 15,
    "typingText": "wall lemon orchard grain student path rare banner earn size license observe cross certain under wreck venture mosquito master chief",
    "wordCount": 20,
    "noSpaceCharacterCount": 112,
    "characterCount": 131,
    "public": True,
    "textExp": 100
  },
  {
    "name": "random20.11",
    "userId": 6,
    "typingText": "pause banner merit surface ice cave duck slide fashion fiber immune exhibit arch rally deal dune reunion sauce leisure apple",
    "wordCount": 20,
    "noSpaceCharacterCount": 105,
    "characterCount": 124,
    "public": True,
    "textExp": 100
  },
  {
    "name": "random20.12",
    "userId": 7,
    "typingText": "entry spice sing flavor elevator hawk smile survey jewel cousin update defense absorb practice proof sketch width snap rocket coffee",
    "wordCount": 20,
    "noSpaceCharacterCount": 113,
    "characterCount": 132,
    "public": True,
    "textExp": 100
  },
  {
    "name": "random20.13",
    "userId": 8,
    "typingText": "general refuse beauty tenant method impulse guitar frown blouse animal strike slice flame ostrich water milk property trophy angry banana",
    "wordCount": 20,
    "noSpaceCharacterCount": 118,
    "characterCount": 137,
    "public": True,
    "textExp": 100
  },
  {
    "name": "random20.14",
    "userId": 9,
    "typingText": "barely unaware negative glory case advice lamp term crew orchard orbit tunnel skin hover spy prevent devote custom midnight piano",
    "wordCount": 20,
    "noSpaceCharacterCount": 110,
    "characterCount": 129,
    "public": True,
    "textExp": 100
  },
  {
    "name": "random20.15",
    "userId": 10,
    "typingText": "coil cricket trust vital margin shed soldier car blade under proof stable shallow skate acid crumble view toast prison guitar",
    "wordCount": 20,
    "noSpaceCharacterCount": 106,
    "characterCount": 125,
    "public": True,
    "textExp": 100
  },
  {
    "name": "random20.16",
    "userId": 11,
    "typingText": "melt lend image nephew dinosaur craft stage escape lemon garlic purchase royal gallery list seat castle manage rapid doll dessert",
    "wordCount": 20,
    "noSpaceCharacterCount": 110,
    "characterCount": 129,
    "public": True,
    "textExp": 100
  },
  {
    "name": "random20.17",
    "userId": 12,
    "typingText": "tragic lend response relax borrow mandate unit kite gate topic artwork extend tower flat vendor lizard pond release century ocean",
    "wordCount": 20,
    "noSpaceCharacterCount": 110,
    "characterCount": 129,
    "public": True,
    "textExp": 100
  },
  {
    "name": "random20.18",
    "userId": 13,
    "typingText": "garage crush ecology crucial tell blouse culture tackle dwarf plate lift town witness rude leisure oxygen timber hospital journey rain",
    "wordCount": 20,
    "noSpaceCharacterCount": 115,
    "characterCount": 134,
    "public": True,
    "textExp": 100
  },
  {
    "name": "random20.19",
    "userId": 14,
    "typingText": "passion night ocean blue glow suffer bottom fame priority output bronze peace slush choice shoe bomb village refuse switch mountain",
    "wordCount": 20,
    "noSpaceCharacterCount": 112,
    "characterCount": 131,
    "public": True,
    "textExp": 100
  },
  {
    "name": "random20.20",
    "userId": 15,
    "typingText": "wall lemon orchard grain student path rare banner earn size license observe cross certain under wreck venture mosquito castle table",
    "wordCount": 20,
    "noSpaceCharacterCount": 112,
    "characterCount": 131,
    "public": True,
    "textExp": 100
  },
{
    "name": "random50.1",
    "userId": 1,
    "typingText": "want humor reform crouch promotion pneumonia approach fall sex abuse medium mile economic curtain cause objective lift mystery restoration splurge agency paralyzed conception disappointment researcher costume separate residence steak tasty benefit fade nail member activate taxi equal hide threat tolerant ruin duke indirect emotion accident total scan clerk personal analysis",
    "wordCount": 50,
    "noSpaceCharacterCount": 327,
    "characterCount": 376,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.2",
    "userId": 2,
    "typingText": "destroy dinner concept witch foundation company ultimate apple stain collection farmer editor park inspire plot delay busy donor sniff minority fan plastic nerve start discrimination farmer chair elite hole prey sustain abstract boat resident slave punch snack classic retire publisher crew sniff expert donate clinic depth listen flower power context ",
    "wordCount": 50,
    "noSpaceCharacterCount": 302,
    "characterCount": 351,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.3",
    "userId": 3,
    "typingText": "bridge jewel word fault carrot candidate steward president ban toll forward base bike access place egg analysis dramatic deer gallon coin opposite combine penalty feel owner double form dirt axis sword trick flow positive clock prisoner ghost headquarters compete stake wake off galaxy steady coffee portion jelly lounge garlic convention ",
    "wordCount": 50,
    "noSpaceCharacterCount": 289,
    "characterCount": 339,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.4",
    "userId": 4,
    "typingText": "engine focus state mosque statement chain factor mayor missile curl sphere justify cope ankle sandwich palm resident reserve rough eye monkey clean solid tone signal community scheme cheese revolution distribution leave access anchor voyage analyst cop rise issue organize judgment race woman difficulty basement justice gaze migration Mars gradient telephone",
    "wordCount": 50,
    "noSpaceCharacterCount": 310,
    "characterCount": 359,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.5",
    "userId": 5,
    "typingText": "describe damage round lion banana drown save pine envelope crane motor sensitive relation push exception lamb swallow hypothesis uncle sense retire tick cloak notion virgin ability part helmet extent debut potato deserve brother reflect cabinet protest bacon fantasy competition ensure theater gallery soft world give adopt visit basis appeal confront",
    "wordCount": 50,
    "noSpaceCharacterCount": 302,
    "characterCount": 351,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.6",
    "userId": 6,
    "typingText": "close dog land dress champion pollution honey phone strict anchor snap judge development profession critic animal convince mug car field height exterior firewoman pyramid carpet sympathy population begin saint favor refugee context trend farm duration advance assault lunch thick prize shift minimum displace growth definite spell determine shout sip thought" ,
    "wordCount": 50,
    "noSpaceCharacterCount": 309,
    "characterCount": 358,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.7",
    "userId": 7,
    "typingText": "find analyst color dealer bomb bar campaign thinker keep omission ally monster tendency impulse grant sample ballet cluster distant civilize pavement crystal rail mood vibrate crude formal party parent crumble admire prey scratch passport electron drum jar eyebrow blaze gain departure palm trick whisper combine rumor computer limit section tree",
    "wordCount": 50,
    "noSpaceCharacterCount": 297,
    "characterCount": 346,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.8",
    "userId": 8,
    "typingText": "acoustic soap deer reward bolt meet cold rage environment flavor poor kitchen wait batch magazine horn kiss reception vegetable impulse button fame habit brilliant diplomat relax straw breed stress chancellor relief pride fool attack banner bell adopt future sight scholar conception miss lock accuse shower bury bundle chimney mutter exchange",
    "wordCount": 50,
    "noSpaceCharacterCount": 294,
    "characterCount": 343,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.9",
    "userId": 9,
    "typingText": "coal march district grade city replace trade complication sample hole month proud horse bay tune reference sweet inch glove kidney highway patrol elephant scream visible release spell suffer sow courage cone virtue reality glide appetite railway scholarship priority pole ethnic spontaneous tourist noble unit penalty healthy linger hall established betray",
    "wordCount": 50,
    "noSpaceCharacterCount": 307,
    "characterCount": 356,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.10",
    "userId": 10,
    "typingText": "tense variation measurement write soil noise syndrome keep throw exposure dead forecast session movie variation vegetable lion pawn title keep deserve soil deserve reception lion pause dead paragraph dynamic tie combine achieve maze toss bold prisoner right story crevice birthday tire hip pollution wear spend grain Bible houseplant fall chimpanzee",
    "wordCount": 50,
    "noSpaceCharacterCount": 300,
    "characterCount": 349,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.11",
    "userId": 11,
    "typingText": "echo danger restrict generate ghost recruit lawyer manage handle pie meadow railroad element pie toll reliance bake lip giant pattern hallway business index fuel forest lion complex ban prisoner pot grip cope release sunshine think home thick moon result castle hole base indicate flower implication play ivory outlet heel outline",
    "wordCount": 50,
    "noSpaceCharacterCount": 281,
    "characterCount": 330,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.12",
    "userId": 12,
    "typingText": "parachute traffic pond civilian lie flag plain control depression deficiency installment master planet pick stake evolution twist second morsel mean culture memory report bicycle building corner disappoint nuance distant drown dentist appreciate eject prospect moon extract orchestra formation branch version reveal apple source fisherman coast solve analysis financial bridge grind",
    "wordCount": 50,
    "noSpaceCharacterCount": 333,
    "characterCount": 382,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.13",
    "userId": 13,
    "typingText": "anger light mess front relieve case crusade date brother grand highlight lodge test route permission breed context contraction folk blade guideline hold disaster",
    "wordCount tooth criminal pillow socialist grandfather paradox vat skeleton assertive gradient shoulder seminar parade impact terminal band toll football fame compartment meat myth immune finished series translate": 50,
    "noSpaceCharacterCount": 328,
    "characterCount": 380,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.14",
    "userId": 14,
    "typingText": "coast black lie repetition shell prescription revise warrant merit flu provide mouse grandmother framework romantic truth narrative thrive audition false failure dig witness singer enjoyment smash ghost hail passive summit falsify cycle build angle confuse correction jacket bow mistreat tough muggy allow pocket pole ribbon arch compensation burial continental exception",
    "wordCount": 50,
    "noSpaceCharacterCount": 322,
    "characterCount": 371,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.15",
    "userId": 15,
    "typingText": "claim recording rest assessment concession process agriculture friend scan spread development stock margin study settlement diagnose communication ancient drawer area disaster bubble mile solution apple vessel scatter hat menu drawer reform pet complain voyage lens district popularity distribute bell maintain loss extract capability friend lung  tribe veil to franchise penalty",
    "wordCount": 50,
    "noSpaceCharacterCount": 329,
    "characterCount": 379,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.16",
    "userId": 1,
    "typingText": "tower fuse output tribe spell faithful accident vague dignity position opposition hair tap smear strike stain banana window card franchise cruel cable designer retailer raw he stake mention society fleet snack return god iron injury influence sand smell warm lie layer comfort physical campaign pass false accept spy stuff sight",
    "wordCount": 50,
    "noSpaceCharacterCount": 279,
    "characterCount": 328,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.17",
    "userId": 2,
    "typingText": "program tell trick climb home positive district extension authority psychology crew missile trace fire scramble missile hunter west quote resource detective shop foreign ban politician draw brave transaction pour bow pardon peasant impress height palace snack reptile pain acute incredible migration pound approach wrong extreme ensure knowledge cater diagram speech",
    "wordCount": 50,
    "noSpaceCharacterCount": 317,
    "characterCount": 366,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.18",
    "userId": 3,
    "typingText": "ambitious balance guest devil steward discrimination situation value peasant retirement reveal white cable appear development print deer diplomat mess anger monopoly revolution portfolio tunnel fireplace shell break banner effective expertise graphic limit command choice disaster lineage channel merchant house resign uniform tender frank reveal angle abstract bowel betray leave stain",
    "wordCount": 50,
    "noSpaceCharacterCount": 337,
    "characterCount": 386,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.19",
    "userId": 4,
    "typingText": "return ban sow album morning search psychology essay lake pile missile breast hand hush nuclear restriction grand lamb vision diplomat leak embark rhythm awful correspondence material permission complete pulse swell circulation interface facade rape middle feed soar medal borrow scheme muscle lecture eagle printer insistence he trial scholar economy accent",
    "wordCount": 50,
    "noSpaceCharacterCount": 309,
    "characterCount": 358,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.20",
    "userId": 5,
    "typingText": "herself isolation plant highway flesh castle forest lamb excitement save union pet achievement ministry diplomat faithful correspondence refrigerator retire alcohol flag script carve stride chief architect missile bubble inspiration attraction modest jam switch outlook pause battery fisherman series tenant computing reaction established star chauvinist national kneel plan frog weak environmental",
    "wordCount": 50,
    "noSpaceCharacterCount": 349,
    "characterCount": 3987,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.21",
    "userId": 6,
    "typingText": "glide glass thick introduction portfolio snake hot cable area spill wake fuse globe publication introduction steward drum opposition clay modernize produce syndrome deprive dragon contempt accompany spend module cell ideal elaborate fly jury baby bar method lease prey useful water investment resist collapse bare sleep payment strength cute trend prove ",
    "wordCount": 50,
    "noSpaceCharacterCount": 304,
    "characterCount": 353,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.22",
    "userId": 7,
    "typingText": "cable trace relation thinker safety option hunger flavor missile rare physics feather stomach dirty hot spray election management ministry therapy simplicity steward rubbish card activate marketing master tourist disposition jacket example arena profile violation fuel outlook jet left weigh emotion talkative reception money fiction shatter real girlfriend peace photocopy direct",
    "wordCount": 50,
    "noSpaceCharacterCount": 331,
    "characterCount": 380,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.23",
    "userId": 8,
    "typingText": "essay court missile trace missile market drum march ministry location knee arrow flavor environment election combine stride judge sweet glove stab rescue temporary residence organize station auction feign hay resignation tourist sequence contradiction kidnap intervention employ fault guideline drift liberal appetite autonomy skeleton ticket manufacture endorse wardrobe sit foot swallow",
    "wordCount": 50,
    "noSpaceCharacterCount": 339,
    "characterCount": 388,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.24",
    "userId": 9,
    "typingText": "cousin castle brake role expose soap pour value adventure sigh modernize climate dragon tension lucky script indication straw positive fountain energy pain relief  sympathetic relief sweep fan copper revolutionary beat native mystery energy connection velvet guideline brave committee impound conflict organize write professor bland attitude charter report friendly social conspiracy",
    "wordCount": 50,
    "noSpaceCharacterCount": 333,
    "characterCount": 383,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.25",
    "userId": 10,
    "typingText": "precious dynamic index swipe brick fortune protest supply message resolution thick apartment fortune twist case protest future ditch frame conflict director lion signal neighbor introduce essay strength trouble production clinic treatment graduate edition revoke water knit gown shout migration hypnothize prosecute research concentration weakness despair show tongue bush mixture wagon",
    "wordCount": 50,
    "noSpaceCharacterCount": 337,
    "characterCount": 386,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.26",
    "userId": 11,
    "typingText": "gesture publisher protest persuade tooth contrast foreign division sunshine discount dominant attention mistake queen stroke disgrace competition option explanation reveal shell expansion board satisfied emotion review real narrow muggy profit degree wriggle recording apparatus journal critic gravel annual wage rotate pair nut loud robot he prove run provide isolation celebration",
    "wordCount": 50,
    "noSpaceCharacterCount": 333,
    "characterCount": 382,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.27",
    "userId": 12,
    "typingText": "exposure sound date combine injection hush dragon attention embryo move depression series wake wife lie elite hall sweet exception location discount offender crime show trick definition index treaty twist grandmother expose disaster syndrome contrast disaster analyst map finance fluctuation hut aunt uncertainty graphic manufacturer arrogant think officer stay wine closed",
    "wordCount": 50,
    "noSpaceCharacterCount": 324,
    "characterCount": 373,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.28",
    "userId": 13,
    "typingText": "area resistance debate color tooth snake market yard sweet snake chaos speed territory chaos corner curtain disk coin shake stroke territory nest wound element abandon reliance speed merchant blue acquit bolt cousin autonomy up auditor announcement live elephant dough jump reporter member drill board dine club mess grief chart love",
    "wordCount": 50,
    "noSpaceCharacterCount": 284,
    "characterCount": 333,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.29",
    "userId": 14,
    "typingText": "action climax produce publisher cherry advice excuse village objection wine giant election tendency essay tribe swimming neighbor condition diamond resource tribe courage move loose hot slap master neighbor rescue church assessment speed institution feminist measure deer wisecrack dilemma leadership native belief lonely remark approach infinite me fight reference ball go",
    "wordCount": 50,
    "noSpaceCharacterCount": 324,
    "characterCount": 373,
    "public": True,
    "textExp": 250
  },
  {
    "name": "random50.30",
    "userId": 15,
    "typingText": "output apple slap church glass fire chief excitement nest dragon scandal snub tension producer fan condition boat protocol climate conclusion retirement brick shake population network neighbor refuse wine troop constitutional intelligence quaint burial content mold dedicate sweat angle take catch frighten navy apparatus fortune movement intervention sunrise presentation computer bomber",
    "wordCount": 50,
    "noSpaceCharacterCount": 339,
    "characterCount": 388,
    "public": True,
    "textExp": 250
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
