-- Resource Metadata
fx_version 'bodacious'
game 'gta5'

-- Resource Info
author 'Hellslicer'
description 'This resource allows you to integrate your own radios in place of the original radios'
version '2.0.0'

-- Example custom radios
-- Supersede RADIO_02_POP with custom radio
supersede_radio 'RADIO_02_POP' { url = 'https://listener2.mp3.tb-group.fm/tb.mp3', volume = 0.2, name = 'We Are One' }
-- Supersede RADIO_03_HIPHOP_NEW with custom radio
supersede_radio 'RADIO_03_HIPHOP_NEW' { url = 'http://stream.radioreklama.bg/nrj.ogg', volume = 0.2 }

-- Client scripts
client_scripts {
	'data.js',
	'client.js',
	'radioScript.js'
}

-- UI files
files {
	'index.html'
}
ui_page 'index.html'
