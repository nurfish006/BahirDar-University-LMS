<div className="container mx-auto py-4 grid grid-cols-3 gap-4">
  <div className="col">
    <Form className="search-form" onSubmit={handleOnSubmit}>
    {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Assignment Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={state.title}
                  placeholder="Enter assignment title"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="description">
                <Form.Label>Assignment Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={state.description}
                  placeholder="Enter assignment description"
                  rows={3}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Dropzone
                onDrop={onDrop}
                onDragEnter={() => updateBorder('over')}
                onDragLeave={() => updateBorder('leave')}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="drop-zone" {...getRootProps()} ref={dropRef}>
                    <input {...getInputProps()} />
                    <p>Drag and drop a file OR click here to select a file</p>
                    {file && (
                      <div>
                        <strong>Selected file:</strong> {file.name}
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </Col>
            <Col>
              {/* {isPreviewAvailable && (
                <div className="image-preview">
                  <img className="preview-image" src={previewSrc} alt="Preview" />
                </div>
              )} */}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Button variant="primary" type="submit">
                Upload
              </Button>
            </Col>
          </Row>
    </Form>
  </div>
  <div className="col">
    <div className="bg-white shadow-md rounded my-6">
      <h2 className="text-xl font-bold py-4 px-6 border-b border-gray-200">Given Assignment</h2>
      <div className="flex flex-col py-4 px-6">
        {/* display component code here */}
        <div className='bg-white shadow-md rounded my-6'>
          <h2 className="text-xl font-bold py-4 px-6 border-b border-gray-200">Given Assignment</h2>
          <div className='flex flex-col py-4 px-6'>
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}
            <table className="table-auto w-full border-collapse border">
              <thead className='bg-gray-200'>
                <tr>
                  <th className='px-4 py-2 text-center font-bold border'>Assignment Title</th>
                  <th className='px-4 py-2 text-center font-bold border'>Assignment Description</th>
                  <th className='px-4 py-2 text-center font-bold border'>Download Assignment</th>
                  <th className='px-4 py-2 text-center font-bold border'>Delete Assignment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filesList.length > 0 ? (
                  filesList.map(
                    ({ _id, title, description, file_path, file_mimetype }) => (
                      <tr key={_id}>
                        <td className="px-4 py-2 border">{title}</td>
                        <td className="px-4 py-2 border">{description}</td>
                        <td className="px-4 py-2 text-center border">
                          <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline-blue'
                            onClick={() =>
                              downloadFile(_id, file_path, file_mimetype)
                            }
                          >
                            Download
                          </button>
                        </td>
                        <td className="px-4 py-2 text-center border">
                          <td className="px-4 py-2 text-center border">
                            <button
                              className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
                              onClick={() => deleteFileceass(_id)}
                            >
                              Delete
                            </button>
                          </td>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={3} className='bg-red-500 p-2 text-center text-white border'>
                      No files found. Please add some.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col">
    <div>
      {/* assignmentSubmited studentCE component code here */}
      <div><SubmittedAsByStudentCe /></div>
    </div>
  </div>
</div>



  /* <div className="container mx-auto py-4">
        <Form className="search-form" onSubmit={handleOnSubmit}>
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Assignment Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={state.title}
                  placeholder="Enter assignment title"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="description">
                <Form.Label>Assignment Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={state.description}
                  placeholder="Enter assignment description"
                  rows={3}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Dropzone
                onDrop={onDrop}
                onDragEnter={() => updateBorder('over')}
                onDragLeave={() => updateBorder('leave')}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="drop-zone" {...getRootProps()} ref={dropRef}>
                    <input {...getInputProps()} />
                    <p>Drag and drop a file OR click here to select a file</p>
                    {file && (
                      <div>
                        <strong>Selected file:</strong> {file.name}
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </Col>
            <Col>
              {/* {isPreviewAvailable && (
                <div className="image-preview">
                  <img className="preview-image" src={previewSrc} alt="Preview" />
                </div>
              )} */
            /* </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Button variant="primary" type="submit">
                Upload
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      <div className='mt-10 mx-auto max-w-7xl'>
        <div className='bg-white shadow-md rounded my-6'>
          <h2 className="text-xl font-bold py-4 px-6 border-b border-gray-200">Given Assignment</h2>
          <div className='flex flex-col py-4 px-6'>
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}
            <table className="table-auto w-full border-collapse border">
              <thead className='bg-gray-200'>
                <tr>
                  <th className='px-4 py-2 text-center font-bold border'>Assignment Title</th>
                  <th className='px-4 py-2 text-center font-bold border'>Assignment Description</th>
                  <th className='px-4 py-2 text-center font-bold border'>Download Assignment</th>
                  <th className='px-4 py-2 text-center font-bold border'>Delete Assignment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filesList.length > 0 ? (
                  filesList.map(
                    ({ _id, title, description, file_path, file_mimetype }) => (
                      <tr key={_id}>
                        <td className="px-4 py-2 border">{title}</td>
                        <td className="px-4 py-2 border">{description}</td>
                        <td className="px-4 py-2 text-center border">
                          <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline-blue'
                            onClick={() =>
                              downloadFile(_id, file_path, file_mimetype)
                            }
                          >
                            Download
                          </button>
                        </td>
                        <td className="px-4 py-2 text-center border">
                          <td className="px-4 py-2 text-center border">
                            <button
                              className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
                              onClick={() => deleteFileceass(_id)}
                            >
                              Delete
                            </button>
                          </td>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={3} className='bg-red-500 p-2 text-center text-white border'>
                      No files found. Please add some.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <div><SubmittedAsByStudentCe /></div> */
    