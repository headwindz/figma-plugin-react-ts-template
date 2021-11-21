import { CLOSE, CREATE } from '@constants';

// Sandbox code
figma.showUI(__html__);

// listen to message from ui
figma.ui.on('message', msg => {
  const { type } = msg;
  if (type === CLOSE) {
    figma.closePlugin();
  } else if (type === CREATE) {
    const nodes = [];
    for (let i = 0; i < msg.payload; i++) {
      const frame = figma.createFrame();
      frame.x = i * 150;
      frame.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0.5}}];
      figma.currentPage.appendChild(frame);
      nodes.push(frame);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
});
