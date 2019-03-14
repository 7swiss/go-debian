go.filter.types.string = Ext.extend(Ext.Panel, {
	layout: "hbox",
	flex: 1,
	initComponent: function () {
		
		this.operatorCombo = new go.form.ComboBox({
				submit: false,
				hideLabel: true,
				name: "operator",
				value: 'contains',
				store: new Ext.data.ArrayStore({
					fields: ['value', 'text'],					
					data: [
						['contains', t("Contains")],
						['equals', t("Equals")],
						['startswith', t("Starts with")],
						['endswith', t("Ends with")]
					]
				}),
				valueField: 'value',
				displayField: 'text',
				mode: 'local',
				triggerAction: 'all',
				editable: false,
				selectOnFocus: true,
				forceSelection: true,
				width: Math.ceil(dp(200))
			});
			
			
		this.valueField = this.createValueField();
		
		this.items = [
			this.operatorCombo,
			this.valueField
		];

		go.filter.types.string.superclass.initComponent.call(this);
	},
	
	createValueField: function() {
		return new Ext.form.TextField({
			flex: 1,
			submit: false,
			name: 'value'
		});
	},
	
	isFormField: true,
	
	name: 'value',
	
	submit : false,
	
	getName : function() {
		return this.name;
	},
	
	setValue: function(v) {
		
		var wildCardPrefix = v.substring(0,1) == "%", l = v.length, wildCardSuffix = v.substring(l -1, l) == "%", operator = "equals";
		
		if(wildCardPrefix && wildCardSuffix) {
			operator = "contains";
		} else if(wildCardPrefix) {
			operator = "endswith";
		} else if(wildCardSuffix) {
			operator = "startswith";
		}
		
		if(wildCardPrefix) {
			v = v.slice(1);
		}
		
		if(wildCardSuffix) {
			v = v.slice(0, -1);
		}
		
		this.operatorCombo.setValue(operator);
		this.valueField.setValue(v);
	},
	getValue: function() {
		
		var v =  this.valueField.getValue();
		
		switch(this.operatorCombo.getValue()) {
			case 'contains':				
				return '%' + v + '%';
				
			case 'equals':				
				return v;
								
			case 'startswith':				
				return v + '%';
				
			case 'endswith':				
				return '%' + v;
		}
	},
	validate: function() {
		return this.valueField.validate() && this.operatorCombo.validate();
	},
	markInvalid : function() {
		return this.valueField.markInvalid();
	},
	clearInvalid : function() {
		return this.valueField.clearInvalid();
	},
	isDirty : function() {
		return this.valueField.isDirty() || this.operatorCombo.isDirty();
	}
	
});
