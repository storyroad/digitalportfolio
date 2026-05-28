from fastapi import APIRouter, HTTPException
from typing import List
import logging
from datetime import datetime

from models.contact import ContactSubmission, ContactSubmissionCreate
from services.email_service import email_service
from database import db

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/contact", tags=["contact"])

@router.post("", response_model=ContactSubmission)
async def create_contact_submission(submission: ContactSubmissionCreate):
    """Submit a contact form"""
    try:
        # Create submission object
        contact_dict = submission.dict()
        contact_obj = ContactSubmission(**contact_dict)
        
        # Save to MongoDB
        result = await db.contact_submissions.insert_one(contact_obj.dict())
        
        # Send email notification (async, don't wait for it)
        try:
            await email_service.send_contact_notification(
                name=submission.name,
                email=submission.email,
                message=submission.message
            )
        except Exception as email_error:
            logger.error(f"Email notification failed but submission saved: {str(email_error)}")
        
        logger.info(f"Contact submission created: {contact_obj.id} from {submission.email}")
        return contact_obj
        
    except Exception as e:
        logger.error(f"Error creating contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@router.get("", response_model=List[ContactSubmission])
async def get_all_contact_submissions():
    """Get all contact submissions (for admin dashboard)"""
    try:
        submissions = await db.contact_submissions.find().sort("timestamp", -1).to_list(1000)
        return [ContactSubmission(**submission) for submission in submissions]
    except Exception as e:
        logger.error(f"Error retrieving contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve submissions")

@router.patch("/{submission_id}/status")
async def update_submission_status(submission_id: str, status: str):
    """Update the status of a submission"""
    try:
        if status not in ["new", "read", "archived"]:
            raise HTTPException(status_code=400, detail="Invalid status")
        
        result = await db.contact_submissions.update_one(
            {"id": submission_id},
            {"$set": {"status": status}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Submission not found")
        
        return {"success": True, "message": "Status updated"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating submission status: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update status")

@router.delete("/{submission_id}")
async def delete_submission(submission_id: str):
    """Delete a submission"""
    try:
        result = await db.contact_submissions.delete_one({"id": submission_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Submission not found")
        
        return {"success": True, "message": "Submission deleted"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete submission")
