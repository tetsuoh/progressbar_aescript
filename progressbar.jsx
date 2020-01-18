(function () {

    function my_func(comp, callback) {
        var layers = [];
        for (var i = 0; i < 100; i++) {
            var layer = comp.layers.addSolid([1, 1, 1], i, comp.width, comp.height, comp.pixelAspect);
            layers.push(layer);
            try {
                callback(i);
            } catch (e) {
                alert(e)
                break;
            }
        }
        return layers;
    }

    function my_func_with_progressbar(comp) {
        var progress_window = new Window('palette',
            'progress...',
            undefined,
            // { borderless: true }
        );
        progress_window.margins = [2, 2, 2, 2];
        progress_window.preferredSize = [800, -1];
        var group = progress_window.add('panel', undefined, '');
        group.alignment = ['fill', 'fill'];
        var progressbar = group.add('progressbar', undefined, '');
        progressbar.alignment = ['fill', 'fill'];

        progress_window.setValue = function (i) {
            progressbar.value = i;
            progress_window.active = true;
            progress_window.update();
        }

        progress_window.show();

        my_func(comp, progress_window.setValue);

        progress_window.close();
    }

    var win = new Window('palette', 'progressbar test');
    var do_func = win.add('button', undefined, 'add 100 layer');

    do_func.onClick = function () {
        var comp = app.project.activeItem;
        if (!comp || !(comp instanceof CompItem)) {
            alert('please select a comp');
            return;
        }

        app.beginUndoGroup('my_func');
        my_func_with_progressbar(comp);
        app.endUndoGroup();
    }

    win.center();
    win.show();
}());