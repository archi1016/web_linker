
var oSection = {
	sections: []
	,plates: []
	,focus_index: 0
	,init: function () {
		var tab_container = document.getElementById('section-tab');
		var plate_container = document.getElementById('content');
		var ul = document.createElement('ul');
		var a;
		var i;
		
		for (i=0; i<DATA_SECTION.length; i++) {
			this.sections[i] = document.createElement('li');
			this.sections[i].setAttribute(ATTRIBUTE_INDEX, i);

			a = document.createElement('a');
			a.textContent = DATA_SECTION[i][COMMON_FIELD_DESCRIPTION];
			a.href= '#';
			a.onclick = function () {
				oSection.click_new_section(parseInt(this.parentNode.getAttribute(ATTRIBUTE_INDEX)));
				return false;
			};
			
			this.sections[i].appendChild(a);
			ul.appendChild(this.sections[i]);
			
			this.plates[i] = document.createElement('div');
			this.plates[i].className = CLASS_HIDE;

			this.build_content_by_id(this.plates[i], DATA_SECTION[i][COMMON_FIELD_ID], i*11);
			
			plate_container.appendChild(this.plates[i]);
		}
		tab_container.appendChild(ul);
		
		this.sections[this.focus_index].className = CLASS_FOCUS;
		this.plates[this.focus_index].className = '';
	}
	,click_new_section: function (ni) {
		if (this.focus_index == ni) return;
		
		this.sections[this.focus_index].className = '';
		this.plates[this.focus_index].className = CLASS_HIDE;
		
		this.focus_index = ni;
		
		this.sections[this.focus_index].className = CLASS_FOCUS;
		this.plates[this.focus_index].className = '';
	}
	,build_content_by_id: function (plate, id, color_offset) {
		var dat = null;
		var build_func = null;
		var n;
		var i;
		var ul;
		var li;
		var h2;
		var ol;
		var j;
		var k;
		var r;
		
		switch (id) {
			case SECTION_ID_WEBSITE:
				dat = DATA_WEBSITE;
				build_func = this.build_website_item;
				break;
			case SECTION_ID_TRAVEL:
				dat = DATA_TRAVEL;
				build_func = this.build_website_item;
				break;
			case SECTION_ID_TV:
				dat = DATA_TV;
				build_func = this.build_tv_item;
				break;
			case SECTION_ID_FASHION:
				dat = DATA_FASHION;
				build_func = this.build_website_item;
				break;
			case SECTION_ID_SHOPPING:
				dat = DATA_SHOPPING;
				build_func = this.build_website_item;
				break;
			case SECTION_ID_SOCIAL:
				dat = DATA_SOCIAL;
				build_func = this.build_website_item;
				break;
			case SECTION_ID_FREE:
				dat = DATA_FREE;
				build_func = this.build_website_item;
				break;
			case SECTION_ID_MOBILE:
				dat = DATA_MOBILE;
				build_func = this.build_website_item;
				break;
			case SECTION_ID_AV:
				dat = DATA_AV;
				build_func = this.build_website_item;
				break;
			case SECTION_ID_GAME:
				dat = DATA_GAME;
				build_func = this.build_website_item;
				break;
			case SECTION_ID_APPLICATION:
				dat = DATA_APPLICATION;
				build_func = this.build_website_item;
				break;
		}
		if (null == dat) return;
		
		n = 1;
		ul = document.createElement('ul');
		for (i=0; i<dat.length; i++) {
			li = document.createElement('li');
			h2 = document.createElement('h2');
			h2.textContent = n+'. '+dat[i][COMMON_FIELD_DESCRIPTION];
			h2.style.background = HEADER_COLORS[(n+color_offset-1) % HEADER_COLORS.length];
			ol = document.createElement('ol');
			
			k = 0;
			for (j=0; j<dat[i][COMMON_FIELD_ITEMS].length; j++) {
				build_func(ol, dat[i][COMMON_FIELD_ITEMS][j], j+1);				
				r = (j+1) % 10;
				if (0 == r) {
					li.appendChild(h2);
					li.appendChild(ol);
					ul.appendChild(li);
					n++;
					
					li = document.createElement('li');
					h2 = document.createElement('h2');
					h2.textContent = n+'. '+dat[i][COMMON_FIELD_DESCRIPTION];
					h2.style.background = HEADER_COLORS[(n+color_offset-1) % HEADER_COLORS.length];
					ol = document.createElement('ol');
				}
			}
			
			if (0 != r) {
				li.appendChild(h2);
				li.appendChild(ol);
				ul.appendChild(li);
				n++;
			}
		}
		plate.appendChild(ul);
	}
	,build_website_item: function (ol, item_row, n) {
		var li = document.createElement('li');
		var span = document.createElement('span');
		var a = document.createElement('a');
	
		span.textContent = n+'.';
	
		a.textContent = item_row[WEBSITE_FIELD_DESCRIPTION];
		a.href = item_row[WEBSITE_FIELD_URL];
		a.target = '_blank';
	
		li.appendChild(span);
		li.appendChild(a);
		ol.appendChild(li);
	}
	,build_tv_item: function (ol, item_row, n) {
		var li = document.createElement('li');
		var span = document.createElement('span');
		var a = document.createElement('a');
	
		span.textContent = n+'.';
	
		a.textContent = item_row[TV_FIELD_DESCRIPTION];
		a.href = item_row[TV_FIELD_URL];
		a.target = '_blank';
	
		li.appendChild(span);
		li.appendChild(a);
		ol.appendChild(li);
	}
}

/* ========================================================================== */

function insert_class_to_element(e, c) {
	e.className += ' '+c;
}

function remove_class_of_element(e, c) {
	e.className = e.className.replace(' '+c, '');
}

/* ========================================================================== */

function init_page() {
	oSection.init();
}

window.onload = init_page;