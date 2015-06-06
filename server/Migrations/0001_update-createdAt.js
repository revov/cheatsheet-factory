Migrations.add({
    version: 1,
    name: 'Sets the CreatedAt field of old cheatsheets',
    up: function() {
        Cheatsheets.update(
            {
                'meta.createdAt': {
                    $exists: false
                }
            },
            {
                $set: {
                    'meta.createdAt': new Date
                }
            },
            {
                multi: true,
                validate: false
            }
        );
    },
    down: function() {
        // No need for a down migration
    }
});