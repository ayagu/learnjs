'use strict';

var learnjs = {};

learnjs.problems = [
    {
        description: "What is Truth",
        code: "function problem() { return  __; }"
    },
    {
        description: "Simple Math",
        code: "function problem() { return 42 === 6 * __; }"
    },
    {
        description: "Start of an Array",
        code: "function problem() { var list = [42, 23, 10]; return __ === 42; }"
    },
    {
        description: "Accessing Attribute",
        code: 'function problem() { var p = {name: "Ken"}; return __ == "Ken"; }'
    },
    {
        description: "Increment Variable",
        code: "function problem() { var a = 41; return (++a == __); }"
    }
];

learnjs.flashElement = function(elem, content) {
    elem.fadeOut('fast', function() {
        elem.html(content);
        elem.fadeIn();
    });
}

learnjs.applyObject = function(obj, elem) {
    for(var key in obj) {
        elem.find('[data-name="' + key + '"]').text(obj[key]);
    }
}


learnjs.template = function(name) {
  return $('.templates .' + name).clone();
}

learnjs.buildCorrectFlash = function(number) {
    var correctFlash = learnjs.template('correct-flash');
    var link = correctFlash.find('a');
    if (number < learnjs.problems.length) {
        link.attr('href', '#problem-' + (number + 1));
    }
    else {
        link.attr('href', '');
        link.text("You're Finished!");
    }
    return correctFlash;
}

learnjs.appOnReady = function() {

  window.onhashchange = function() {
//  alert(window.location.hash);
    learnjs.showView(window.location.hash);
  };

//  alert(window.location.hash);
  learnjs.showView(window.location.hash);
}

learnjs.problemView = function(data) {
    console.log('call problemView with: ' + data);

    var number = parseInt(data, 10);
    var view = $('.templates .problem-view').clone();
    //console.log('original templates');
    //console.log(view.html());

    var problem = learnjs.problems[number - 1];
    var resultFlash = view.find('.result');

//    learnjs.applyObject(problem, view);

    function checkAnswer() {
        var answer = view.find('.answer').val();
        answer = answer == "" ? 0 : answer;
        var test = problem.code.replace('__', answer) + '; problem();';
        console.log('test');
        console.log(test);
        return eval(test);
    }

    function checkAnswerClick() {
        if (checkAnswer()) {
            var correctFlash = learnjs.template('correct-flash');
            correctFlash.find('a').attr('href', '#problem-' + (number + 1));
            learnjs.flashElement(resultFlash, correctFlash);
        }
        else {
            learnjs.flashElement(resultFlash, 'Incorrect!');
        }
        return false;
    }
/*
    function handleSubmit() {
        var resText = null;
        if (checkAnswer()) {
            //result.text('Correct');
            
            resText = learnjs.buildCorrectFlash(number).html();
        }
        else {
            //result.text('Incorrect');
            resText = '<p class="result">Incorrect</p>';
        }
        learnjs.flashElement(result, resText);
    }
*/

    view.find('.check-btn').click(checkAnswerClick);
    view.find('.title').text('Problem #' + number);
    learnjs.applyObject(problem, view);

/*
    var result = view.find('.result');
    if (number < learnjs.problems.length) {
        var buttonItem = learnjs.template('skip-btn');
        buttonItem.find('a').attr('href', '#problem-' + (number + 1));
        view.find('form > div').append(buttonItem);
        view.bind('removeView', function() {
            buttonItem.remove();
        });
    }
    view.find('.check-btn').click(function() {
        handleSubmit();
    });
*/
    return view;

}

learnjs.triggerEvent = function(name, args) {
    $('.view-container>*').trigger(name, args);
}

learnjs.showView = function(hash) {
//    var problemView = $('<div class="problem-view">').text('Coming soon!!');
//    $('.view-container').empty().append(problemView);


    var routes = {
        '#problem': learnjs.problemView
    };

    var hashParts = hash.split('-');
    console.log(hashParts[0]);
    var viewFn = routes[hashParts[0]];
    if (viewFn) {
        console.log('has vewFn');
//        learnjs.triggerEvent('removingView', []);
        var view = viewFn(hashParts[1]);
        //console.log(view.html());
        $('.view-container').empty().append(view);

    }

}

$(function(){

});

