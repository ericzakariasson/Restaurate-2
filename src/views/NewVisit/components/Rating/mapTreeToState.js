function mapTreeToState(tree) {
  return tree.reduce((state, item) => {
    var name = item.name;

    if (!state[name]) {
      state[name] = { value: 0, isRated: false };
    }

    if (item.children) {
      state[name].children = item.children.map(child => child.name)
      for (const child of item.children) {
        if (!state[child]) {
          state[child.name] = { value: 0, isRated: false, parent: name };
        }
      }
    }

    return state;
  }, {})
}

export default mapTreeToState;