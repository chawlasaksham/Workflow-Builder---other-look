import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import ContextToolbar from "components/ui/ContextToolbar";


// Page imports
import Login from "pages/Login";
import Profile from "pages/Profile";
import Settings from "pages/Settings";
import WorkflowDashboard from "pages/workflow-dashboard";
import VisualWorkflowEditor from "pages/visual-workflow-editor";
import NodeConfigurationPanel from "pages/node-configuration-panel";
import WorkflowExecutionMonitor from "pages/workflow-execution-monitor";
import WorkflowTemplatesLibrary from "pages/workflow-templates-library";
import ResetPassword from "pages/ResetPassword";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <div className="min-h-screen bg-background">
          <Header />
          <ContextToolbar />
          <div className="pt-16">
            <RouterRoutes>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/" element={<WorkflowDashboard />} />
              <Route path="/workflow-dashboard" element={<WorkflowDashboard />} />
              <Route path="/visual-workflow-editor" element={<VisualWorkflowEditor />} />
              <Route path="/node-configuration-panel" element={<NodeConfigurationPanel />} />
              <Route path="/workflow-execution-monitor" element={<WorkflowExecutionMonitor />} />
              <Route path="/workflow-templates-library" element={<WorkflowTemplatesLibrary />} />
            </RouterRoutes>
          </div>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;