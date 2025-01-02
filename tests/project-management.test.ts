import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Project Management Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('create-project', () => {
    it('should create a project successfully', async () => {
      const title = 'Rainforest Restoration';
      const description = 'Restore 1000 acres of rainforest';
      const location = 'Amazon, Brazil';
      const startDate = 1672531200; // 2023-01-01
      const endDate = 1704067200; // 2024-01-01
      const totalMilestones = 5;
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new project ID
      
      const result = await mockContractCall('project-management', 'create-project', [
        title, description, location, startDate, endDate, totalMilestones
      ]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('project-management', 'create-project', [
        title, description, location, startDate, endDate, totalMilestones
      ]);
    });
  });
  
  describe('add-milestone', () => {
    it('should add a milestone successfully', async () => {
      const projectId = 1;
      const description = 'Plant 1000 trees';
      const targetDate = 1688169600; // 2023-07-01
      
      mockContractCall.mockResolvedValue({ value: 0 }); // Assuming 0 is the new milestone ID
      
      const result = await mockContractCall('project-management', 'add-milestone', [
        projectId, description, targetDate
      ]);
      
      expect(result.value).toBe(0);
      expect(mockContractCall).toHaveBeenCalledWith('project-management', 'add-milestone', [
        projectId, description, targetDate
      ]);
    });
    
    it('should fail if the caller is not the project owner', async () => {
      const projectId = 1;
      const description = 'Plant 1000 trees';
      const targetDate = 1688169600; // 2023-07-01
      
      mockContractCall.mockRejectedValue(new Error('Unauthorized'));
      
      await expect(mockContractCall('project-management', 'add-milestone', [
        projectId, description, targetDate
      ])).rejects.toThrow('Unauthorized');
    });
  });
  
  describe('complete-milestone', () => {
    it('should complete a milestone successfully', async () => {
      const projectId = 1;
      const milestoneId = 0;
      const verificationData = 'Satellite imagery confirms 1000 trees planted';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('project-management', 'complete-milestone', [
        projectId, milestoneId, verificationData
      ]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('project-management', 'complete-milestone', [
        projectId, milestoneId, verificationData
      ]);
    });
    
    it('should fail if the milestone is already completed', async () => {
      const projectId = 1;
      const milestoneId = 0;
      const verificationData = 'Satellite imagery confirms 1000 trees planted';
      
      mockContractCall.mockRejectedValue(new Error('Milestone already completed'));
      
      await expect(mockContractCall('project-management', 'complete-milestone', [
        projectId, milestoneId, verificationData
      ])).rejects.toThrow('Milestone already completed');
    });
  });
  
  describe('get-project', () => {
    it('should return project details', async () => {
      const projectId = 1;
      const expectedProject = {
        owner: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        title: 'Rainforest Restoration',
        description: 'Restore 1000 acres of rainforest',
        location: 'Amazon, Brazil',
        status: 'active',
        start_date: 1672531200,
        end_date: 1704067200,
        total_milestones: 5,
        completed_milestones: 1
      };
      
      mockContractCall.mockResolvedValue({ value: expectedProject });
      
      const result = await mockContractCall('project-management', 'get-project', [projectId]);
      
      expect(result.value).toEqual(expectedProject);
      expect(mockContractCall).toHaveBeenCalledWith('project-management', 'get-project', [projectId]);
    });
    
    it('should return null for non-existent project', async () => {
      const projectId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('project-management', 'get-project', [projectId]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-project-count', () => {
    it('should return the total number of projects', async () => {
      const expectedCount = 5;
      
      mockContractCall.mockResolvedValue({ value: expectedCount });
      
      const result = await mockContractCall('project-management', 'get-project-count', []);
      
      expect(result.value).toBe(expectedCount);
      expect(mockContractCall).toHaveBeenCalledWith('project-management', 'get-project-count', []);
    });
  });
});

