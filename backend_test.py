#!/usr/bin/env python3
"""
Backend API Testing Script for Automation Portfolio Website
Tests contact form submission and admin dashboard endpoints
"""

import requests
import json
from datetime import datetime
import sys

# Base URL from environment
BASE_URL = "https://automation-showcase-23.preview.emergentagent.com/api"
CONTACT_URL = f"{BASE_URL}/contact"

# Color codes for output
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
RESET = '\033[0m'

def print_test(test_name):
    print(f"\n{BLUE}{'='*60}{RESET}")
    print(f"{BLUE}Testing: {test_name}{RESET}")
    print(f"{BLUE}{'='*60}{RESET}")

def print_success(message):
    print(f"{GREEN}✓ {message}{RESET}")

def print_error(message):
    print(f"{RED}✗ {message}{RESET}")

def print_info(message):
    print(f"{YELLOW}ℹ {message}{RESET}")

def test_post_contact_valid():
    """Test POST /api/contact with valid data"""
    print_test("POST /api/contact - Valid submission")
    
    payload = {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "message": "This is a test message for the automation portfolio contact form."
    }
    
    try:
        response = requests.post(CONTACT_URL, json=payload, timeout=10)
        print_info(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print_info(f"Response: {json.dumps(data, indent=2)}")
            
            # Verify response structure
            required_fields = ['id', 'name', 'email', 'message', 'timestamp', 'status']
            missing_fields = [field for field in required_fields if field not in data]
            
            if missing_fields:
                print_error(f"Missing fields in response: {missing_fields}")
                return None
            
            # Verify data matches
            if data['name'] != payload['name']:
                print_error(f"Name mismatch: expected {payload['name']}, got {data['name']}")
                return None
            
            if data['email'] != payload['email']:
                print_error(f"Email mismatch: expected {payload['email']}, got {data['email']}")
                return None
            
            if data['message'] != payload['message']:
                print_error(f"Message mismatch: expected {payload['message']}, got {data['message']}")
                return None
            
            if data['status'] != 'new':
                print_error(f"Status should be 'new', got {data['status']}")
                return None
            
            print_success("Contact submission created successfully")
            print_success(f"Submission ID: {data['id']}")
            return data['id']
        else:
            print_error(f"Expected status 200, got {response.status_code}")
            print_error(f"Response: {response.text}")
            return None
            
    except Exception as e:
        print_error(f"Exception occurred: {str(e)}")
        return None

def test_post_contact_invalid_email():
    """Test POST /api/contact with invalid email"""
    print_test("POST /api/contact - Invalid email validation")
    
    payload = {
        "name": "Jane Smith",
        "email": "invalid-email",
        "message": "Testing invalid email"
    }
    
    try:
        response = requests.post(CONTACT_URL, json=payload, timeout=10)
        print_info(f"Status Code: {response.status_code}")
        
        if response.status_code == 422:
            print_success("Email validation working correctly (422 Unprocessable Entity)")
            return True
        else:
            print_error(f"Expected status 422 for invalid email, got {response.status_code}")
            print_info(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print_error(f"Exception occurred: {str(e)}")
        return False

def test_post_contact_missing_fields():
    """Test POST /api/contact with missing required fields"""
    print_test("POST /api/contact - Missing required fields")
    
    payload = {
        "name": "Test User"
        # Missing email and message
    }
    
    try:
        response = requests.post(CONTACT_URL, json=payload, timeout=10)
        print_info(f"Status Code: {response.status_code}")
        
        if response.status_code == 422:
            print_success("Missing field validation working correctly (422 Unprocessable Entity)")
            return True
        else:
            print_error(f"Expected status 422 for missing fields, got {response.status_code}")
            print_info(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print_error(f"Exception occurred: {str(e)}")
        return False

def test_get_all_submissions():
    """Test GET /api/contact - Get all submissions"""
    print_test("GET /api/contact - Get all submissions")
    
    try:
        response = requests.get(CONTACT_URL, timeout=10)
        print_info(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print_info(f"Number of submissions: {len(data)}")
            
            if not isinstance(data, list):
                print_error("Response should be an array")
                return False
            
            if len(data) > 0:
                print_info(f"Sample submission: {json.dumps(data[0], indent=2)}")
                
                # Verify sorting (newest first)
                if len(data) > 1:
                    first_timestamp = data[0]['timestamp']
                    second_timestamp = data[1]['timestamp']
                    if first_timestamp < second_timestamp:
                        print_error("Submissions not sorted by newest first")
                        return False
                    else:
                        print_success("Submissions sorted correctly (newest first)")
            
            print_success("Retrieved all submissions successfully")
            return True
        else:
            print_error(f"Expected status 200, got {response.status_code}")
            print_error(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print_error(f"Exception occurred: {str(e)}")
        return False

def test_update_status(submission_id):
    """Test PATCH /api/contact/{submission_id}/status"""
    print_test(f"PATCH /api/contact/{submission_id}/status - Update status to 'read'")
    
    try:
        url = f"{CONTACT_URL}/{submission_id}/status?status=read"
        response = requests.patch(url, timeout=10)
        print_info(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print_info(f"Response: {json.dumps(data, indent=2)}")
            
            if data.get('success') == True:
                print_success("Status updated successfully")
                
                # Verify the update by fetching the submission
                get_response = requests.get(CONTACT_URL, timeout=10)
                if get_response.status_code == 200:
                    submissions = get_response.json()
                    updated_submission = next((s for s in submissions if s['id'] == submission_id), None)
                    
                    if updated_submission:
                        if updated_submission['status'] == 'read':
                            print_success("Status verified as 'read' in database")
                            return True
                        else:
                            print_error(f"Status not updated in database. Current status: {updated_submission['status']}")
                            return False
                    else:
                        print_error("Submission not found when verifying update")
                        return False
                else:
                    print_error("Could not verify status update")
                    return False
            else:
                print_error("Update response did not indicate success")
                return False
        else:
            print_error(f"Expected status 200, got {response.status_code}")
            print_error(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print_error(f"Exception occurred: {str(e)}")
        return False

def test_update_status_invalid():
    """Test PATCH /api/contact/{submission_id}/status with invalid status"""
    print_test("PATCH /api/contact/test-id/status - Invalid status value")
    
    try:
        url = f"{CONTACT_URL}/test-id/status?status=invalid_status"
        response = requests.patch(url, timeout=10)
        print_info(f"Status Code: {response.status_code}")
        
        if response.status_code == 400:
            print_success("Invalid status validation working correctly (400 Bad Request)")
            return True
        else:
            print_error(f"Expected status 400 for invalid status, got {response.status_code}")
            print_info(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print_error(f"Exception occurred: {str(e)}")
        return False

def test_delete_submission(submission_id):
    """Test DELETE /api/contact/{submission_id}"""
    print_test(f"DELETE /api/contact/{submission_id} - Delete submission")
    
    try:
        url = f"{CONTACT_URL}/{submission_id}"
        response = requests.delete(url, timeout=10)
        print_info(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print_info(f"Response: {json.dumps(data, indent=2)}")
            
            if data.get('success') == True:
                print_success("Submission deleted successfully")
                
                # Verify deletion
                get_response = requests.get(CONTACT_URL, timeout=10)
                if get_response.status_code == 200:
                    submissions = get_response.json()
                    deleted_submission = next((s for s in submissions if s['id'] == submission_id), None)
                    
                    if deleted_submission is None:
                        print_success("Deletion verified - submission not found in database")
                        return True
                    else:
                        print_error("Submission still exists in database after deletion")
                        return False
                else:
                    print_error("Could not verify deletion")
                    return False
            else:
                print_error("Delete response did not indicate success")
                return False
        else:
            print_error(f"Expected status 200, got {response.status_code}")
            print_error(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print_error(f"Exception occurred: {str(e)}")
        return False

def test_delete_nonexistent():
    """Test DELETE /api/contact/{submission_id} with non-existent ID"""
    print_test("DELETE /api/contact/nonexistent-id - Delete non-existent submission")
    
    try:
        url = f"{CONTACT_URL}/nonexistent-id-12345"
        response = requests.delete(url, timeout=10)
        print_info(f"Status Code: {response.status_code}")
        
        if response.status_code == 404:
            print_success("Non-existent ID handling working correctly (404 Not Found)")
            return True
        else:
            print_error(f"Expected status 404 for non-existent ID, got {response.status_code}")
            print_info(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print_error(f"Exception occurred: {str(e)}")
        return False

def run_full_test_flow():
    """Run the complete test flow"""
    print(f"\n{BLUE}{'='*60}{RESET}")
    print(f"{BLUE}Starting Backend API Tests{RESET}")
    print(f"{BLUE}Base URL: {BASE_URL}{RESET}")
    print(f"{BLUE}{'='*60}{RESET}")
    
    results = {
        'passed': 0,
        'failed': 0,
        'total': 0
    }
    
    # Test 1: Create a valid submission
    submission_id = test_post_contact_valid()
    results['total'] += 1
    if submission_id:
        results['passed'] += 1
    else:
        results['failed'] += 1
        print_error("Cannot continue with remaining tests without a valid submission ID")
        return results
    
    # Test 2: Invalid email validation
    results['total'] += 1
    if test_post_contact_invalid_email():
        results['passed'] += 1
    else:
        results['failed'] += 1
    
    # Test 3: Missing fields validation
    results['total'] += 1
    if test_post_contact_missing_fields():
        results['passed'] += 1
    else:
        results['failed'] += 1
    
    # Test 4: Get all submissions
    results['total'] += 1
    if test_get_all_submissions():
        results['passed'] += 1
    else:
        results['failed'] += 1
    
    # Test 5: Update status to 'read'
    results['total'] += 1
    if test_update_status(submission_id):
        results['passed'] += 1
    else:
        results['failed'] += 1
    
    # Test 6: Invalid status validation
    results['total'] += 1
    if test_update_status_invalid():
        results['passed'] += 1
    else:
        results['failed'] += 1
    
    # Test 7: Delete the submission
    results['total'] += 1
    if test_delete_submission(submission_id):
        results['passed'] += 1
    else:
        results['failed'] += 1
    
    # Test 8: Delete non-existent submission
    results['total'] += 1
    if test_delete_nonexistent():
        results['passed'] += 1
    else:
        results['failed'] += 1
    
    return results

def main():
    """Main test execution"""
    results = run_full_test_flow()
    
    # Print summary
    print(f"\n{BLUE}{'='*60}{RESET}")
    print(f"{BLUE}Test Summary{RESET}")
    print(f"{BLUE}{'='*60}{RESET}")
    print(f"Total Tests: {results['total']}")
    print(f"{GREEN}Passed: {results['passed']}{RESET}")
    print(f"{RED}Failed: {results['failed']}{RESET}")
    
    if results['failed'] == 0:
        print(f"\n{GREEN}All tests passed! ✓{RESET}")
        sys.exit(0)
    else:
        print(f"\n{RED}Some tests failed! ✗{RESET}")
        sys.exit(1)

if __name__ == "__main__":
    main()
