export default (innerTree) => {
  if (innerTree === null) { return null; }
  const format = innerTree.map((node) => {
    switch (node.type) {
		  case 'add':
			  return `  + ${node.key}: ${node.val}`;
		  case 'remove':
			  return `  - ${node.key}: ${node.val}`;
		  case 'same':
			  return `    ${node.key}: ${node.val}`;
		  case 'updated':
			  return `    ${node.key}: ${node.val1}\n    ${node.key}: ${node.val2}`;
		  default:
			  throw new Error(`Этого типа не существует: ${node.type}`);
	  }
  });
return `{\n${format.join('\n')}\n}`;
};
