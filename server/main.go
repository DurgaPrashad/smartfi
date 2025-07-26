package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type SessionManager struct {
	sessions map[string]string // sessionId -> phoneNumber
}

var sessionManager = &SessionManager{
	sessions: make(map[string]string),
}

type MCPRequest struct {
	JSONRPC string                 `json:"jsonrpc"`
	ID      int                    `json:"id"`
	Method  string                 `json:"method"`
	Params  map[string]interface{} `json:"params"`
}

type MCPResponse struct {
	JSONRPC string      `json:"jsonrpc"`
	ID      int         `json:"id"`
	Result  interface{} `json:"result,omitempty"`
	Error   interface{} `json:"error,omitempty"`
}

type LoginResponse struct {
	LoginURL string `json:"login_url"`
}

type ToolsListResponse struct {
	Tools []Tool `json:"tools"`
}

type Tool struct {
	Name        string                 `json:"name"`
	Description string                 `json:"description"`
	InputSchema map[string]interface{} `json:"inputSchema"`
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3001" // Default port for Go server when running alongside Node.js
	}

	r := mux.NewRouter()

	// CORS setup
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})

	// Frontend routes
	r.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", http.FileServer(http.Dir("./dist/assets/"))))
	r.HandleFunc("/", serveIndex).Methods("GET")
	r.HandleFunc("/{path:.*}", serveIndex).Methods("GET")

	// API routes
	r.HandleFunc("/mcp/stream", handleMCPStream).Methods("POST", "OPTIONS")
	r.HandleFunc("/mockWebPage", handleMockWebPage).Methods("GET")
	r.HandleFunc("/login", handleLogin).Methods("POST")

	handler := c.Handler(r)

	log.Printf("Starting server on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

func serveIndex(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./dist/index.html")
}

func handleMockWebPage(w http.ResponseWriter, r *http.Request) {
	sessionID := r.URL.Query().Get("sessionId")
	if sessionID == "" {
		sessionID = "mcp-session-demo"
	}

	html := fmt.Sprintf(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fi MCP - Mock Login</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 400px;
            margin: 50px auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        h1 { color: #333; text-align: center; margin-bottom: 30px; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; font-weight: 600; color: #555; }
        input, select {
            width: 100%%;
            padding: 12px;
            border: 2px solid #e1e5e9;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s;
        }
        input:focus, select:focus {
            outline: none;
            border-color: #667eea;
        }
        button {
            width: 100%%;
            padding: 12px;
            background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
        }
        button:hover { transform: translateY(-2px); }
        .demo-data {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            font-size: 14px;
        }
        .demo-data h3 { margin-top: 0; color: #495057; }
        .phone-option {
            margin: 8px 0;
            padding: 8px;
            background: white;
            border-radius: 4px;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏦 Fi MCP Login</h1>
        <form id="loginForm">
            <div class="form-group">
                <label for="phoneNumber">Phone Number:</label>
                <select id="phoneNumber" name="phoneNumber" required>
                    <option value="">Select a test phone number...</option>
                    <option value="1111111111">1111111111 - No assets connected</option>
                    <option value="2222222222">2222222222 - All assets connected (Large MF portfolio)</option>
                    <option value="3333333333">3333333333 - All assets connected (Small MF portfolio)</option>
                    <option value="4444444444">4444444444 - All assets + Multiple banks/UAN</option>
                    <option value="5555555555">5555555555 - All assets except credit score</option>
                    <option value="6666666666">6666666666 - All assets except bank account</option>
                    <option value="7777777777">7777777777 - Debt-Heavy Low Performer</option>
                    <option value="8888888888">8888888888 - SIP Samurai</option>
                    <option value="9999999999">9999999999 - Fixed Income Fanatic</option>
                    <option value="1010101010">1010101010 - Precious Metal Believer</option>
                </select>
            </div>
            <div class="form-group">
                <label for="otp">OTP (any value):</label>
                <input type="text" id="otp" name="otp" placeholder="Enter any OTP" required>
            </div>
            <button type="submit">Login</button>
        </form>
        
        <div class="demo-data">
            <h3>🧪 Demo Data Available:</h3>
            <div class="phone-option"><strong>2222222222:</strong> Complete financial profile with large mutual fund portfolio</div>
            <div class="phone-option"><strong>7777777777:</strong> High debt, poor performance scenario</div>
            <div class="phone-option"><strong>8888888888:</strong> Consistent SIP investor profile</div>
            <p style="margin-top: 15px; font-style: italic; color: #6c757d;">
                Select any phone number and enter any OTP to access dummy financial data.
            </p>
        </div>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phoneNumber = document.getElementById('phoneNumber').value;
            const otp = document.getElementById('otp').value;
            
            if (!phoneNumber || !otp) {
                alert('Please fill in all fields');
                return;
            }
            
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId: '%s',
                    phoneNumber: phoneNumber,
                    otp: otp
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/login-success?sessionId=%s';
                } else {
                    alert(data.message || 'Login failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Login failed. Please try again.');
            });
        });
    </script>
</body>
</html>`, sessionID, sessionID)

	w.Header().Set("Content-Type", "text/html")
	w.Write([]byte(html))
}

func handleLogin(w http.ResponseWriter, r *http.Request) {
	var loginReq struct {
		SessionID   string `json:"sessionId"`
		PhoneNumber string `json:"phoneNumber"`
		OTP         string `json:"otp"`
	}

	if err := json.NewDecoder(r.Body).Decode(&loginReq); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// Validate phone number (check if test data exists)
	possiblePaths := []string{
		filepath.Join("server", "test_data_dir", loginReq.PhoneNumber),
		filepath.Join("test_data_dir", loginReq.PhoneNumber),
		filepath.Join("..", "server", "test_data_dir", loginReq.PhoneNumber),
	}
	
	var pathExists bool
	for _, path := range possiblePaths {
		if _, err := os.Stat(path); err == nil {
			pathExists = true
			break
		}
	}
	
	if !pathExists {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Invalid phone number. Please select from available test numbers.",
		})
		return
	}

	// Store session
	sessionManager.sessions[loginReq.SessionID] = loginReq.PhoneNumber

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Login successful",
	})
}

func handleMCPStream(w http.ResponseWriter, r *http.Request) {
	sessionID := r.Header.Get("Mcp-Session-Id")
	if sessionID == "" {
		sessionID = "mcp-session-demo" // Default for testing
	}

	phoneNumber, exists := sessionManager.sessions[sessionID]
	if !exists {
		// Return login URL instead of error
		response := MCPResponse{
			JSONRPC: "2.0",
			ID:      1,
			Result: LoginResponse{
				LoginURL: fmt.Sprintf("/mockWebPage?sessionId=%s", sessionID),
			},
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
		return
	}

	var req MCPRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	var response MCPResponse
	response.JSONRPC = "2.0"
	response.ID = req.ID

	switch req.Method {
	case "tools/list":
		response.Result = getToolsList()
	case "tools/call":
		toolName := req.Params["name"].(string)
		result, err := callTool(toolName, phoneNumber)
		if err != nil {
			response.Error = map[string]interface{}{
				"code":    -1,
				"message": err.Error(),
			}
		} else {
			response.Result = result
		}
	default:
		response.Error = map[string]interface{}{
			"code":    -32601,
			"message": "Method not found",
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func getToolsList() ToolsListResponse {
	tools := []Tool{
		{
			Name:        "fetch_net_worth",
			Description: "Fetch user's net worth including assets and liabilities",
			InputSchema: map[string]interface{}{
				"type":       "object",
				"properties": map[string]interface{}{},
				"required":   []string{},
			},
		},
		{
			Name:        "fetch_credit_report",
			Description: "Fetch user's credit report and score",
			InputSchema: map[string]interface{}{
				"type":       "object",
				"properties": map[string]interface{}{},
				"required":   []string{},
			},
		},
		{
			Name:        "fetch_epf_details",
			Description: "Fetch user's EPF account details",
			InputSchema: map[string]interface{}{
				"type":       "object",
				"properties": map[string]interface{}{},
				"required":   []string{},
			},
		},
		{
			Name:        "fetch_mutual_fund_transactions",
			Description: "Fetch user's mutual fund transactions",
			InputSchema: map[string]interface{}{
				"type":       "object",
				"properties": map[string]interface{}{},
				"required":   []string{},
			},
		},
		{
			Name:        "fetch_bank_transactions",
			Description: "Fetch user's bank transactions",
			InputSchema: map[string]interface{}{
				"type":       "object",
				"properties": map[string]interface{}{},
				"required":   []string{},
			},
		},
	}

	return ToolsListResponse{Tools: tools}
}

func callTool(toolName, phoneNumber string) (interface{}, error) {
	// Try different paths for development vs production
	possiblePaths := []string{
		filepath.Join("server", "test_data_dir", phoneNumber, toolName+".json"),
		filepath.Join("test_data_dir", phoneNumber, toolName+".json"),
		filepath.Join("..", "server", "test_data_dir", phoneNumber, toolName+".json"),
	}
	
	var data []byte
	var err error
	
	for _, path := range possiblePaths {
		if data, err = ioutil.ReadFile(path); err == nil {
			break
		}
	}
	
	if err != nil {
		return nil, fmt.Errorf("failed to load data for %s from any path: %v", toolName, err)
	}

	var result interface{}
	if err := json.Unmarshal(data, &result); err != nil {
		return nil, fmt.Errorf("failed to parse data for %s: %v", toolName, err)
	}

	return result, nil
}