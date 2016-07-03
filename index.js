// Model
var Model = function() {
    this.text = "";
    this.onChange = null;
};

Model.prototype.setText = function(value) {
    if (this.text.length % 2 == 0) {
      this.text = value.toUpperCase();
    } else {
      this.text = value.toLowerCase();
    }
    if (this.onChange) {
        this.onChange(this.text);
    }
};

// View
var View = function(elementSelector, initialValue) {
    this.element = $(elementSelector);
    this.setValue(initialValue || '');
    this.onChange = null;

    this.element.on('input', this.onInput.bind(this));
};

View.prototype.onInput = function() {
    var value = this.element.val();
    if (this.onChange) {
        this.onChange(value);
    }
};

View.prototype.setValue = function(text) {
    this.element.val(text);
};

// Controller
var Controller = function(model, view) {
    view.onChange = model.setText.bind(model);
    model.onChange = view.setValue.bind(view);
};

// On page load instantiate MVC objects
document.addEventListener('DOMContentLoaded', function() {
    var model = new Model();
    var view = new View('.textInput');
    var controller = new Controller(model, view);
});
