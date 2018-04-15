/*
describe('LearnJS', function() {
  it('can show a problem view', function() {
    learnjs.showView('#problem-1');
    expect($('.view-container .problem-view').length).toEqual(1); 
  });
});
*/
describe('LearnJS', function() {
//  it('shows the landing page on empty hash', function() {
//    learnjs.showView('');
//    expect($('.view-container .landing-view').length).toEqual(1);
//  });

  it('passes parameter to view function', function() {
    spyOn(learnjs, 'problemView');
    learnjs.showView('#problem-42');
    expect(learnjs.problemView).toHaveBeenCalledWith('42');
  });
});

describe('LearnJS', function() {
    it('subscribes to the hash change event', function() {
        learnjs.appOnReady();
        spyOn(learnjs, 'showView');
        $(window).trigger('hashchange');
        expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
    });
});

describe('answer section', function() {
    it('can check correct answer by hitting a button', function() {
        var view = learnjs.problemView('1');
        view.find('textarea.answer').text('true');
        console.log('my view !!!!!!');
        console.log(view.html());
        view.find('.check-btn').click();
        expect(view.find('.result').html()).toEqual('Correct!');

    });
    it('reject an incorrect answer', function() {
        var view = learnjs.problemView('1');
        view.find('.answer').text('false');
        view.find('.check-btn').click();
        expect(view.find('.result').html()).toEqual('Incorrect!');
    
    });
});

describe('problem view', function() {
    it('has a title that includes the problem number', function() {
      var view = learnjs.problemView('1');
      //var title = view.find('.title');
      console.log(view.find('h3.title').html());
      expect(view.find('h3.title').html()).toEqual('Problem #1');
    });
/*
    it ('invoke the router when loaded', function() {
      spyOn(learnjs, 'showView');
      learnjs.appOnReady();
      expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
    });
*/
});


