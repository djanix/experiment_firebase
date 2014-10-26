$.ViewHome = ring.create([$.View], {
    constructor: function (el) {
        var self = this;
        self.$super(el);
    },

    //-- Vars
    //--------------------------------------------------------------

    //-- Init
    //--------------------------------------------------------------
    initHook: function () {
        var self = this;
        self.$super();
        self.initFirebase();
        self.bindEventsHook();
    },

    //-- Functions
    //--------------------------------------------------------------
    bindEventsHook: function () {
        var self = this;

        self.el.find('#messageInput').on('keypress', function (e) {
            if (e.keyCode == 13) {
                var name = self.el.find('#nameInput').val();
                var text = self.el.find('#messageInput').val();

                self.firebaseRef.push({name: name, text: text});

                self.el.find('#messageInput').val('');
            }
        });

        self.firebaseRef.on('child_added', function (snapshot) {
            var message = snapshot.val();
            self.displayChatMessage(message.name, message.text);
        });
    },

    initFirebase: function () {
        var self = this;
        self.firebaseRef = new Firebase('https://blistering-heat-3490.firebaseio.com');
    },

    displayChatMessage: function (name, text) {
        var self = this;
        self.el.find('.chat').append('' +
            '<div class="message">' +
                '<span class="name">' + name + ':</span> ' +
                '<span class="text">' + text + '</span>' +
            '</div>'
        );
    },

    empty: null
});