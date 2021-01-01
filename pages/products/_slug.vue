<template>
    <section class="product">
      <div class="grid gap-md">

          <!-- Image -->
        <div class="col-6@md col-7@lg">
          <figure class="image-zoom js-image-zoom ">
            <img class="image-zoom__preview js-image-zoom__preview" src="https://codyhouse.co/app/assets/img/product-img-1.jpg" alt="Preview image description">
            <figcaption class="sr-only">Image Caption</figcaption>
          </figure>
        </div>

        <!-- Right Column -->
        <div class="col-6@md col-5@lg">
            <!-- Title -->
          <div class="margin-bottom-xs">
            <h1>{{ product.name }}</h1>
          </div>

          <!-- Description -->
          <div class="text-component v-space-md margin-y-md">
            <p v-if="product.description">
                {{ product.description }}
            </p>
            <p class="text-md">
                <del class="text-line-through color-contrast-medium margin-right-xxs">$49</del>
                <ins class="text-decoration-none">$29</ins>
            </p>
          </div>

          <!-- Buttons Group - Size Selector -->
          <div class="margin-bottom-md">
            <p class="sr-only">Select size:</p>

            <div class="btns gap-xs btns--radio">
              <div>
                <input type="radio" name="sizeBtns" id="sizeBtnsS" checked>
                <label class="btns__btn" for="sizeBtnsS">S</label>
              </div>

              <div>
                <input type="radio" name="sizeBtns" id="sizeBtnsM">
                <label class="btns__btn" for="sizeBtnsM">M</label>
              </div>

              <div>
                <input type="radio" name="sizeBtns" id="sizeBtnsL">
                <label class="btns__btn" for="sizeBtnsL">L</label>
              </div>

              <div>
                <input type="radio" name="sizeBtns" id="sizeBtnsXL" disabled>
                <label class="btns__btn btns__btn--disabled" for="sizeBtnsXL">XL</label>
              </div>
            </div>
          </div>

          <div class="flex gap-xs">
             <!-- Quanitity Selector -->
            <label class="form-label sr-only" for="qtyInput">Quantity:</label>
            <div class="number-input number-input--v1 js-number-input ">
              <input class="form-control js-number-input__value" type="number" name="qtyInput" id="qtyInput" min="0" max="20" step="1" value="1">

              <div class="number-input__btns">
                <button class="reset number-input__btn number-input__btn--plus js-number-input__btn" aria-label="Increase Number">
                  <svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><g><polygon points="13,11 8,5 3,11 "></polygon></g></svg>
                </button>

                <button class="reset number-input__btn number-input__btn--minus js-number-input__btn" aria-label="Decrease Number">
                  <svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><g><polygon points="3,5 8,11 13,5 "></polygon></g></svg>
                </button>
              </div>
            </div>

            <!-- Add to Cart Button -->
            <button class="btn btn--primary flex-grow">Add to Cart</button>
          </div>
        </div>

      </div>
    </section>
</template>

<script>
// TODO
// TODO: Move BUTTONS GROUP and NUMBER SELECTOR into seperate components
// TODO

export default {
    data() {
        return {
            product: null
        }
    },

    async asyncData({ params, app }) {
        let response = await app.$axios.$get('products/' + params.slug)

        return {
            product: response.data
        }
    },

    mounted() {
        // File#: _1_number-input
        // Usage: codyhouse.co/license
        (function() {
          var InputNumber = function(element) {
            this.element = element;
            this.input = this.element.getElementsByClassName('js-number-input__value')[0];
            this.min = parseFloat(this.input.getAttribute('min'));
            this.max = parseFloat(this.input.getAttribute('max'));
            this.step = parseFloat(this.input.getAttribute('step'));
            if(isNaN(this.step)) this.step = 1;
            this.precision = getStepPrecision(this.step);
            initInputNumberEvents(this);
          };

          function initInputNumberEvents(input) {
            // listen to the click event on the custom increment buttons
            input.element.addEventListener('click', function(event){
              var increment = event.target.closest('.js-number-input__btn');
              if(increment) {
                event.preventDefault();
                updateInputNumber(input, increment);
              }
            });

            // when input changes, make sure the new value is acceptable
            input.input.addEventListener('focusout', function(event){
              var value = parseFloat(input.input.value);
              if( value < input.min ) value = input.min;
              if( value > input.max ) value = input.max;
              // check value is multiple of step
              value = checkIsMultipleStep(input, value);
              if( value != parseFloat(input.input.value)) input.input.value = value;

            });
          };

          function getStepPrecision(step) {
            // if step is a floating number, return its precision
            return (step.toString().length - Math.floor(step).toString().length - 1);
          };

          function updateInputNumber(input, btn) {
            var value = ( Util.hasClass(btn, 'number-input__btn--plus') ) ? parseFloat(input.input.value) + input.step : parseFloat(input.input.value) - input.step;
            if( input.precision > 0 ) value = value.toFixed(input.precision);
            if( value < input.min ) value = input.min;
            if( value > input.max ) value = input.max;
            input.input.value = value;
            input.input.dispatchEvent(new CustomEvent('change', {bubbles: true})); // trigger change event
          };

          function checkIsMultipleStep(input, value) {
            // check if the number inserted is a multiple of the step value
            var remain = (value*10*input.precision)%(input.step*10*input.precision);
            if( remain != 0) value = value - remain;
            if( input.precision > 0 ) value = value.toFixed(input.precision);
            return value;
          };

          //initialize the InputNumber objects
          var inputNumbers = document.getElementsByClassName('js-number-input');
          if( inputNumbers.length > 0 ) {
            for( var i = 0; i < inputNumbers.length; i++) {
              (function(i){new InputNumber(inputNumbers[i]);})(i);
            }
          }
        }());
    }
}
</script>

<style lang="scss">
/* --------------------------------

File#: _1_btns
Title: Buttons (Group)
Descr: Group of connected buttons
Usage: codyhouse.co/license

-------------------------------- */

:root {
  --btns-button-radius: 0.25em;
  --btns-button-padding-x: var(--space-sm);
  --btns-button-padding-y: var(--space-sm);
}

.btns { // button group
  display: inline-block; // flex fallback
  display: inline-flex;

  > * {
    display: inline-block; // flex fallback
  }

  > *:first-child, *:first-child .btns__btn {
    border-radius: var(--btns-button-radius) 0 0 var(--btns-button-radius);
  }

  > *:last-child, *:last-child .btns__btn {
    border-radius: 0 var(--btns-button-radius) var(--btns-button-radius) 0;
  }
}

// make btns compatible with the gap utility classes of CodyFrame
.btns[class*="gap-xxxxs"], .btns[class*="gap-xxxs"], .btns[class*="gap-xxs"], .btns[class*="gap-xs"], .btns[class*="gap-sm"], .btns[class*="gap-md"], .btns[class*="gap-lg"], .btns[class*="gap-xl"], .btns[class*="gap-xxl"], .btns[class*="gap-xxxl"], .btns[class*="gap-xxxxl"] {
  flex-wrap: wrap;

  .btns__btn {
    border-radius: var(--btns-button-radius) !important;
  }
}

// single button
.btns__btn {
  @include reset;
  display: block; // fallback
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: var(--space-xs) var(--space-sm);
  background-color: var(--color-contrast-lower);
  transition: .2s;
  cursor: pointer;
  @include fontSmooth;

  &:hover:not(.btns__btn--selected) {
    background-color: lightness(var(--color-contrast-lower), 0.98);
  }

  &:focus {
    z-index: 1;
    outline: none;
    box-shadow: 0 0 0 2px alpha(var(--color-primary), 0.2);
  }
}

.btns__btn--selected { //  selected style
  background-color: var(--color-contrast-higher);
  color: var(--color-bg);
  box-shadow: var(--shadow-sm);
}

.btns__btn--disabled {
  opacity: 0.7;
  cursor: not-allowed;
  text-decoration: line-through;
}

// --radio, --checkbox
.btns--radio, .btns--checkbox {
  > * {
    position: relative;
  }

  input[type="radio"],
  input[type="checkbox"] {
    /* hide native buttons */
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
    opacity: 0;
    height: 0;
    width: 0;
    pointer-events: none;
  }

  input[type="radio"] + label,
  input[type="checkbox"] + label {
    user-select: none;
  }

  input[type="radio"]:focus + label,
  input[type="checkbox"]:focus + label {
    z-index: 1;
    box-shadow: 0 0 0 2px alpha(var(--color-primary), 0.2);
  }

  input[type="radio"]:checked + label,
  input[type="checkbox"]:checked + label {
    /* checked state */
    @extend .btns__btn--selected;
  }
}

.btns__btn--icon {
  padding: var(--btns-button-padding-x);

  .icon {
    display: block;
    color: inherit;
  }
}

/* --------------------------------

File#: _1_number-input
Title: Number input
Descr: Number input field with custom increment buttons
Usage: codyhouse.co/license

-------------------------------- */

.number-input__btn { // hide custom increment buttons if js is disabled
  display: none;
}

.js {
  .number-input { // basic style
    .form-control::-webkit-inner-spin-button,
    .form-control::-webkit-outer-spin-button { // hide native increment on webkit
      display: none;
    }

    .form-control { // hide native increment on Firefox
      -moz-appearance: textfield;
      display: block;
    }
  }

  .number-input__btn { // custom increment buttons
    display: inline-block; // flex fallback
    display: flex;
  }
}

// default - custom increment buttons inside input
.js .number-input--v1 {
  --number-input-btn-width: 40px;
  position: relative;
  width: 5em;

  .form-control {
    padding-right: var(--number-input-btn-width);
    width: 100%;
  }

  .number-input__btns {
    position: absolute;
    height: calc(100% - var(--space-xxxs)*2);
    top: var(--space-xxxs);
    right: 0;
    width: var(--number-input-btn-width);
    display: flex;
    flex-direction: column;
  }

  .number-input__btn {
    position: relative;
    height: 50%;
    width: calc(100% - var(--space-xxxs));
    background: var(--color-contrast-lower);
    border-radius: var(--radius-sm);

    .icon {
      display: block;
      font-size: 0.8em; // icon size
      width: 1em;
      height: 1em;
      position: absolute;
      left: calc(50% - 0.5em);
      top: calc(50% - 0.5em);
    }

    &:hover {
      background-color: var(--color-contrast-low);
    }

    &:focus {
      outline: none;
      background-color: var(--color-primary);

      .icon {
        color: var(--color-white);
      }
    }

    &:active {
      background-color: lightness(var(--color-primary), 0.9);
    }
  }

  .number-input__btn--plus {
    margin-bottom: var(--space-xxxxs);
  }
}

// --v2 - custom increment w/ buttons outside input element
.js .number-input--v2 {
  --number-input-btn-width: 1.6em;
  display: flex;
  align-items: center;
  font-size: 0.875em;

  .form-control {
    margin: 0 var(--space-xxs);
    width: 4em;
    order: 1;
    text-align: center;
  }

  .number-input__btn {
    width: var(--number-input-btn-width);
    height: var(--number-input-btn-width);
    border-radius: 50%;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    background-color: var(--color-contrast-lower);

    &:hover {
      background-color: var(--color-contrast-low);
    }

    &:focus {
      outline: none;
      background-color: var(--color-primary);

      .icon {
        color: var(--color-white);
      }
    }

    &:active {
      background-color: lightness(var(--color-primary), 0.9);
    }

    .icon {
      font-size: 12px; // icon size
      width: 1em;
      height: 1em;
    }
  }

  .number-input__btn--plus {
    order: 2;
  }
}
</style>
