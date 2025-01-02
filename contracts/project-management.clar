;; Project Management Contract

(define-map projects
  { project-id: uint }
  {
    owner: principal,
    title: (string-utf8 100),
    description: (string-utf8 1000),
    location: (string-utf8 100),
    status: (string-ascii 20),
    start-date: uint,
    end-date: uint,
    total-milestones: uint,
    completed-milestones: uint
  }
)

(define-map milestones
  { project-id: uint, milestone-id: uint }
  {
    description: (string-utf8 500),
    target-date: uint,
    status: (string-ascii 20),
    verification-data: (optional (string-utf8 1000))
  }
)

(define-data-var project-count uint u0)

(define-public (create-project (title (string-utf8 100)) (description (string-utf8 1000)) (location (string-utf8 100)) (start-date uint) (end-date uint) (total-milestones uint))
  (let
    (
      (new-project-id (+ (var-get project-count) u1))
    )
    (map-set projects
      { project-id: new-project-id }
      {
        owner: tx-sender,
        title: title,
        description: description,
        location: location,
        status: "active",
        start-date: start-date,
        end-date: end-date,
        total-milestones: total-milestones,
        completed-milestones: u0
      }
    )
    (var-set project-count new-project-id)
    (ok new-project-id)
  )
)

(define-public (add-milestone (project-id uint) (description (string-utf8 500)) (target-date uint))
  (let
    (
      (project (unwrap! (map-get? projects { project-id: project-id }) (err u404)))
      (new-milestone-id (get completed-milestones project))
    )
    (asserts! (is-eq (get owner project) tx-sender) (err u403))
    (map-set milestones
      { project-id: project-id, milestone-id: new-milestone-id }
      {
        description: description,
        target-date: target-date,
        status: "pending",
        verification-data: none
      }
    )
    (ok new-milestone-id)
  )
)

(define-public (complete-milestone (project-id uint) (milestone-id uint) (verification-data (string-utf8 1000)))
  (let
    (
      (project (unwrap! (map-get? projects { project-id: project-id }) (err u404)))
      (milestone (unwrap! (map-get? milestones { project-id: project-id, milestone-id: milestone-id }) (err u404)))
    )
    (asserts! (is-eq (get owner project) tx-sender) (err u403))
    (asserts! (is-eq (get status milestone) "pending") (err u400))
    (map-set milestones
      { project-id: project-id, milestone-id: milestone-id }
      (merge milestone {
        status: "completed",
        verification-data: (some verification-data)
      })
    )
    (map-set projects
      { project-id: project-id }
      (merge project {
        completed-milestones: (+ (get completed-milestones project) u1)
      })
    )
    (ok true)
  )
)

(define-read-only (get-project (project-id uint))
  (ok (map-get? projects { project-id: project-id }))
)

(define-read-only (get-milestone (project-id uint) (milestone-id uint))
  (ok (map-get? milestones { project-id: project-id, milestone-id: milestone-id }))
)

(define-read-only (get-project-count)
  (ok (var-get project-count))
)

