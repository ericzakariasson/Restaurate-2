function mapTreeToState(tree) {
  const treeObj = tree.reduce((state, item) => {
    var name = item.name;

    if (item.children) {
      var childObj = item.children.reduce((results, child) => {
        var childName = child.name;
        results[childName] = 0;
        return results;
      }, {});

      state[name] = { useAverage: false, ...childObj };
    } else {
      state[name] = null;
    }
    return state;
  }, {})

  return treeObj;
}

export default mapTreeToState;