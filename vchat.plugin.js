
var response = {response:{"0":{name:'ignat',userId:3}, "1":{name:'ignat2',userId:7} }  };
var lang = {'ru':{appName:'Beboo видео чат',rosterTitle:'Список онлайн'}, 'en':{appName:'Beboo video chat',rosterTitle:'List online'}};

var vchat = (function(self, $) {	
	self.about = {
		name: 'Candy',
		version: '1.0.9'
	};
	
	self.Init = function(service, options) {
		self.View.Init($('#chat'), options.view);	
		self.Core.Init('/http', options.core);			
	};
	
	return self;
})(vchat || {}, jQuery);
	
	
vchat.View = (function(self, $){		
	
	self.Tmpl = {		
		compile:function(t, j){		
			j.lang = self.Lang.getItem(); // include Language array in templater
			return $("#"+t).tmpl(j);
		}
	};	
	self.Init	= function(service, opts){
		vchat.View.Lang.setLang(opts.lang);
	}
	return self;
})(vchat.View || {}, jQuery);
	
	
vchat.View.Lang = (function(self, $){		
		_key = ''; // current Language key
		_collection = {}; // Language array

		self.setLang = function(key){ 
			_collection={'lang':lang[key]};
			_key = key;
		};
		self.getItem = function(key){ 
			if(key!=undefined){
				return _collection.lang[key];
			}
			else{
				return _collection.lang;
			}
		};
		self.getKey = function(){
			return _key;
		};		
		return self;	
})(vchat.View.Lang || {}, jQuery);
	
// vchat Room

vchat.View.Room = (function(self, $){			 
	 self.Roster = {
	 		create: function(response){
	 			vchat.View.Tmpl.compile('userList', response).appendTo('.roster');
	 		},
	 		add:function(u){alert("dd");	 			
	 			vchat.View.Tmpl.compile('rosterNewItem', u).prependTo('#roster-list').slideDown('normal', function() { $(this).animate({ opacity: 1 }); });
	 		},
	 		remove:function(u){
		 		setTimeout(function(){
		 			$("#roster-item-" + u.userId).animate({ opacity: 0 }).slideUp('normal',function(){$(this).remove()}); 			
		 		},2000);		 		 		
	 		}
	 };
	return self;
})(vchat.View.Room || {}, jQuery);	
	
// vchat Core

vchat.Core = (function(self, $){		
	
	var _connection = null;
	var _service = null;
	var _user = null;
	var _rooms = {};
	var	_options = {debug: false};
	
	self.Init = function(service, options) {
		_service = service; 		
		$.extend(true, _options, options);

		// Enable debug logging
		if(_options.debug) {
			self.log = function(str) {
				try { // prevent erroring
					if(typeof window.console !== undefined && typeof window.console.log !== undefined) {
						console.log(str);
					}
				} catch(e) {
					console.error(e);
				}
			};
			self.log('[Init] Debugging enabled');
		}

		// Connect to BOSH service
		//_connection = new Strophe.Connection(_service); 
		//_connection.rawInput = self.rawInput.bind(self);
		//_connection.rawOutput = self.rawOutput.bind(self);
	};
	
	self.getRoom = function(roomId) {
		if (_rooms[roomId]) {
			return _rooms[roomId];
		}
		return null;
	};
	
	self.getOptions = function() {
		return _options;
	};
	
	self.getConnection = function() {
		return _connection;
	};
	
	self.setUser = function(user) {
		_user = user;
	};
	
	self.getUser = function() {
		return _user;
	};
	
	self.connect = function(){
		//self.setUser({});
	};
	
	return self;
})(vchat.Core || {}, jQuery);	
	
	
		
	$(document).ready(function(){
		vchat.Init('',{view:{lang:'ru'},core:{'debug':true}});		
		vchat.View.Room.Roster.create(response);
		vchat.View.Room.Roster.add({userId:17,name:'Vasiliy'});
		vchat.View.Room.Roster.remove({userId:17,name:'Vasiliy'});
		
	
		//alert(vchat.View.Lang.getItem('appName'));
		//alert(vchat.View.Lang.getKey());
		//vchat.View.Lang.setLang('en');
		//alert(vchat.View.Lang.getItem('appName'));
		//alert(vchat.View.Lang.getItem('rosterTitle'));
		
		
	});