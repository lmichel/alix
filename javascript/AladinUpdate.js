/**
 * @preserve LICENSE
 * 
 * Copyright (c) 2017 Laurent Michel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE. 
**/

cds.Catalog.prototype._doMakeFlash = function(stepNb, totalNbSteps, show, timeDelay) {
    if (show) {
      this.show();
    }
    else {
      this.hide();
    }
    var self = this;
    if (stepNb<totalNbSteps) {
      setTimeout(function() {self._doMakeFlash(stepNb+1, totalNbSteps, !show, timeDelay);}, timeDelay);
    }
};

cds.Catalog.prototype.makeFlash = function() {
    this._doMakeFlash(1, 2*5, false, 200);
};

// function called when a source is clicked. Called by the View object
cds.Source.prototype.actionClicked = function() {
    if (this.catalog && this.catalog.onClick) {
    	AladinLiteX_mVc.setLastSelectedPosition(this.catalog.name,this.ra, this.dec)
        var view = this.catalog.view;
        if (this.catalog.onClick=='showTable') {
            view.aladin.measurementTable.showMeasurement(this);
            this.select();
        }
        else if (this.catalog.onClick=='showPopup') {
            view.popup.setTitle('<br><br>');
            var m = '<div class="aladin-marker-measurement">';
            m += '<table>';
            for (var key in this.data) {
                m += '<tr><td>' + key + '</td><td>' + this.data[key] + '</td></tr>';
            }
            m += '</table>';
            m += '</div>';
            view.popup.setText(m);
            view.popup.setSource(this);
            view.popup.show();
        }
        else if (typeof this.catalog.onClick === 'function' ) {
            this.catalog.onClick(this);
            view.lastClickedObject = this;
            this.select();

        }
    }
};

//The sources selected will be unselected when the empty part of aladin clicked.But the sources selected keep selected when we check one of the related sources,
MeasurementTable.prototype.hide = function() {
    this.divEl.hide();
    $("#SourceDiv").css("display","none");
    AladinLiteX_mVc.deleteSourceAuto();
    AladinLiteX_mVc.deleteLastSelectedPosition();
};
//To clean the target when we click the empty part of aladin
cds.Source.prototype.actionOtherObjectClicked = function() {
    if (this.catalog && this.catalog.onClick) {
        this.deselect();
        $("#SourceDiv").css("display","none");
        AladinLiteX_mVc.cleanCatalog("Target");
        AladinLiteX_mVc.deleteLastSelectedPosition();
	}
};


ProgressiveCat.prototype._doMakeFlash = function(stepNb, totalNbSteps, show, timeDelay) {
    if (show) {
      this.show();
    }
    else {
      this.hide();
    }
    var self = this;
    if (stepNb<totalNbSteps) {
      setTimeout(function() {self._doMakeFlash(stepNb+1, totalNbSteps, !show, timeDelay);}, timeDelay);
    }
};

ProgressiveCat.prototype.makeFlash = function() {
    this._doMakeFlash(1, 2*5, false, 200);
};
/**
 * Limit he number of sources at 999
 */
URLBuilder.buildVizieRCSURL = function(vizCatId, target, radiusDegrees) {
    if (target && (typeof target  === "object")) {
        if ('ra' in target && 'dec' in target) {
            var coo = new Coo(target.ra, target.dec, 7);
            target = coo.format('s');
        }
    }
    return 'http://vizier.unistra.fr/viz-bin/votable?-source=' + vizCatId + '&-c=' + encodeURIComponent(target) + '&-out.max=20000&-c.rd=' + radiusDegrees;
};


var Location = (function() {
    // constructor
    Location = function(locationDiv) {
    		this.$div = $(locationDiv);
    	};
	
	Location.prototype.update = function(lon, lat, cooFrame, isViewCenterPosition) {
        isViewCenterPosition = (isViewCenterPosition && isViewCenterPosition===true) || false;
		var coo = new Coo(lon, lat, 7);
		var updateDiv = $("#aladin-lite-div-target")
		if (cooFrame==CooFrameEnum.J2000) {
            this.$div.html(coo.format('s/'));
            updateDiv.val(coo.format('s/'));
        }
		else if (cooFrame==CooFrameEnum.J2000d) {
            this.$div.html(coo.format('d/'));
            updateDiv.val(coo.format('d/'));
        }
        else {
            this.$div.html(coo.format('d/'));
            updateDiv.val(coo.format('d/'));
        }
        this.$div.toggleClass('aladin-reticleColor', isViewCenterPosition);
        updateDiv.toggleClass('aladin-reticleColor', isViewCenterPosition);
	};
	
	return Location;
})();
	

