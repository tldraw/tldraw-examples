import { Canvas, Tldraw } from "@tldraw/tldraw-beta";
import "@tldraw/tldraw-beta/tldraw.css";
import { ContextMenu, TldrawUi, TldrawUiContextProvider } from "@tldraw/ui";
import "@tldraw/ui/tldraw-ui.css";

export function App() {
  return (
    <div className="app">
      <Tldraw>
        <TldrawUiContextProvider>
          <ContextMenu>
            <Canvas />
          </ContextMenu>
          <TldrawUi />
        </TldrawUiContextProvider>
      </Tldraw>
    </div>
  );
}
