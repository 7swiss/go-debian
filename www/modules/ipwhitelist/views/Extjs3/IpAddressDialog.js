GO.ipwhitelist.IpAddressDialog = Ext.extend(GO.dialog.TabbedFormDialog , {
	initComponent : function(){
		
		Ext.apply(this, {
			titleField:'ip_address',
			title:t("IP address", "ipwhitelist"),
			formControllerUrl: 'ipwhitelist/ipAddress',
			height:200
		});
		
		GO.ipwhitelist.IpAddressDialog.superclass.initComponent.call(this);	
	},
	buildForm : function () {

		this.propertiesPanel = new Ext.Panel({
			border: false,
//			baseParams: {task: 'category'},			
			title:t("Properties"),			
			cls:'go-form-panel',waitMsgTarget:true,			
			layout:'form',
			autoScroll:true,
			items:[this.groupField = new Ext.form.Hidden({
			  name: 'group_id',
				anchor: '-20',
			  allowBlank:false,
//			  fieldLabel: t("Name")
			}), this.ipAddressField = new Ext.form.TextField({
			  name: 'ip_address',
				anchor: '-20',
			  allowBlank:false,
				maxLength: 64,
			  fieldLabel: t("IP address", "ipwhitelist")
			}), this.descriptionField = new Ext.form.TextField({
			  name: 'description',
				anchor: '-20',
			  allowBlank:true,
				maxLength: 64,
			  fieldLabel: t("Description")
			})]
				
		});

		this.addPanel(this.propertiesPanel);	

	},
	show : function( ipAddressId, groupId, config ) {
		
		if (!GO.util.empty(config)) {
			
			if (!GO.util.empty(config.loadParams)) {
				
				config.loadParams['group_id'] = groupId;
				
			} else {
				
				config.loadParams = {
					group_id : groupId
				}
				
			}
			
		} else {
			
				var config = {
						loadParams:{
							group_id: groupId
						}
				}	
			
		}
		
		this.groupField.setValue(groupId);
		
		GO.ipwhitelist.IpAddressDialog.superclass.show.call(this,ipAddressId,config);
		
	}
});