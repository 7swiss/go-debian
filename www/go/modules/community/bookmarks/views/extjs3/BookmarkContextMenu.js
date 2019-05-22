go.modules.community.bookmarks.BookmarkContextMenu = Ext.extend(Ext.menu.Menu,{
	
	initComponent: function() {
		this['shadow'] = 'frame';
		this['minWidth'] = 180;
					
		this.deleteButton = new Ext.menu.Item({
			iconCls: 'btn-delete',
			text: t("Delete"),
			cls: 'x-btn-text-icon',
			handler: function(){
				Ext.MessageBox.confirm(t("Confirm delete"), t("Are you sure you want to delete this item?"), function (btn) {
					if (btn != "yes") {
						return;
					}
					go.Db.store("Bookmark").set({destroy: [this.record.id]});
				}, this);
			},
			scope:this
		});
		
		this.editButton = new Ext.menu.Item({
			
			iconCls: 'btn-edit',
			text: t("Edit"),
			cls: 'x-btn-text-icon',
			handler: function(){
				var dlg = new go.modules.community.bookmarks.BookmarksDialog();
				dlg.load(this.record.id).show();						
			},
			scope:this
		});
		
		this.items=[this.deleteButton,this.editButton];
		go.modules.community.bookmarks.BookmarkContextMenu.superclass.initComponent.call(this);	
	},
	setRecord : function (record){
		this.record = record;
		this.editButton.setDisabled(record.data.permissionLevel<GO.permissionLevels.write);
		this.deleteButton.setDisabled(record.data.permissionLevel<GO.permissionLevels.writeAndDelete);
	}
});
