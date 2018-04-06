go.modules.community.imapauthenticator.ServerForm = Ext.extend(go.form.FormWindow, {
	title: t('Server profile', 'imapauth'),
	entityStore: go.Stores.get("community", "ImapAuthServer"),
	width: dp(400),
	height: dp(600),
	autoScroll: true,
	initFormItems: function () {

	
		return [{
				title: 'IMAP Server',
				xtype: 'fieldset',
				defaults: {
					anchor: '100%'
				},
				items: [{

						hint: t("Enter the domains this imap server should be used to authenticate. Users must login with their e-mail address and if the domain matches this profile it will be used.", "imapauthenticator"),
						xtype: "gridfield",
						name: "domains",
						store: new Ext.data.JsonStore({
							autoDestroy: true,
							root: "records",
							fields: [
								'id',
								'name'
							]
						}),
						fieldLabel: "Domains",

						autoExpandColumn: "name",
						columns: [
							{
								id: 'name',
								header: t('Name'),
								sortable: false,
								dataIndex: 'name',
								hideable: false,
								draggable: false,
								menuDisabled: true,
								editor: new Ext.form.TextField({
									allowBlank: false
								})
							}
						],
					},

					{
						xtype: 'textfield',
						name: 'imapHostname',
						fieldLabel: t("Hostname", "imapauthenticator"),
						required: true
					}, {
						xtype: 'numberfield',
						decimals: 0,
						name: 'imapPort',
						fieldLabel: t("Port", "imapauthenticator"),
						required: true,
						value: 143
					}, {
						xtype: 'combo',
						name: 'imapEncryption',
						fieldLabel: t('Encryption'),
						mode: 'local',
						editable: false,
						triggerAction: 'all',
						store: new Ext.data.ArrayStore({
							fields: [
								'value',
								'display'
							],
							data: [['tls', 'TLS'], ['ssl', 'SSL'], [null, 'None']]
						}),
						valueField: 'value',
						displayField: 'display',
						value: 'tls'
					}, {
						xtype: 'xcheckbox',
						checked: true,
						hideLabel: true,
						boxLabel: t('Validate certificate'),
						name: 'imapValidateCertificate'
					}, {
						xtype: 'xcheckbox',
						hideLabel: true,
						boxLabel: t('Remove domain from username', 'imapauthenticator'),
						name: 'removeDomainFromUsername',
						hint: t("Users must login with their full e-mail adress. Enable this option if the IMAP excepts the username without domain.")
					}]
			}, {
				title: 'SMTP Server',
				xtype: 'fieldset',
				defaults: {
					anchor: '100%'
				},
				items: [{
						xtype: 'textfield',
						name: 'smtpHostname',
						fieldLabel: t('Hostname'),
					}, {
						xtype: 'numberfield',
						name: 'smtpPort',
						fieldLabel: t('Port'),
						decimals: 0,
						value: 587
					}, {
						xtype: 'xcheckbox',
						hideLabel: true,
						boxLabel: t('Use user credentials', 'imapauthenticator'),
						name: 'smtpUseUserCredentials',
						hint: t("Enable this if the SMTP server credentials are identical to the IMAP server.", "imapauthenticator"),
						listeners: {
							check: function (checkbox, checked) {
								this.formPanel.getForm().findField('smtpUsername').setDisabled(checked);
								this.formPanel.getForm().findField('smtpPassword').setDisabled(checked);
							},
							scope: this
						}
					}, {
						xtype: 'textfield',
						name: 'smtpUsername',
						fieldLabel: t('Username')
					}, {
						xtype: 'textfield',
						name: 'smtpPassword',
						fieldLabel: t('Password')
					}, {
						xtype: 'combo',
						name: 'smtpEncryption',
						fieldLabel: t('Encryption'),
						mode: 'local',
						editable: false,
						triggerAction: 'all',
						store: new Ext.data.ArrayStore({
							fields: [
								'value',
								'display'
							],
							data: [['tls', 'TLS'], ['ssl', 'SSL'], [null, 'None']]
						}),
						valueField: 'value',
						displayField: 'display',
						value: 'tls'
					}, {
						xtype: 'xcheckbox',
						hideLabel: true,
						boxLabel: t('Validate certificate'),
						name: 'smtpValidateCertificate',
						checked: true
					}]
			}, {
				xtype: 'fieldset',
				title: t("User options", "imapauthenticator"),
				items: [
					new go.form.multiselect.Field({
						hint: t("Users will automatically be added to these groups", "imapauthenticator"),
						name: "groups",
						idField: "groupId",
						displayField: "name",
						entityStore: go.Stores.get("community", "Group"),
						
						fieldLabel: t("Groups"),
						storeBaseParams:{
							filter: [{"includeUsers" : false}]
						}
					})
				]
			}
		];
	}
});

